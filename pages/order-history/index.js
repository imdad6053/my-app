import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Spinner,
} from "reactstrap";
import classnames from "classnames";
import ListHeadeer from "../../components/order-history/list-header";
import ListItem from "../../components/order-history/list-item";
import SEO from "../../components/seo";
import { useSelector } from "react-redux";
import { OrderApi } from "../../api/main/order";
import { useEffect } from "react";
import RiveResult from "../../components/loader/rive-result";
import Pagination from "rc-pagination";
import CartLoader from "../../components/loader/cart-loader";
import useQueryParams from "../../hooks/useQueryParams";
const Drawer = dynamic(() => import("../../components/drawer"));
const RefundModal = dynamic(() =>
  import("../../components/order-history/refund-modal")
);
const RefundDetailModal = dynamic(() =>
  import("../../components/order-history/refund-detail-modal")
);
const DeliveryStatus = dynamic(() =>
  import("../../components/order-history/delivery-status")
);

const OrderHistory = () => {
  const tabs = [
    {
      tabId: "new",
      name: "New",
    },
    {
      tabId: "accepted",
      name: "Accepted",
    },
    {
      tabId: "ready",
      name: "Ready",
    },
    {
      tabId: "on_a_way",
      name: "On a way",
    },
    {
      tabId: "delivered",
      name: "Delivered",
    },
    {
      tabId: "canceled",
      name: "Canceled",
    },
  ];
  const [activeTab, setActivetab] = useState("new");
  const [visible, setVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalDetail, setModalDetail] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const user = useSelector((state) => state.user.data);

  const { query, changeQueryParams, removeQueryParams } = useQueryParams();

  const { orderId, tab } = query;

  useEffect(() => {
    if (orderId) {
      setVisible(true);
      setCurrentOrderId(orderId);
    }
  }, [orderId]);

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActivetab(tab);
      setCurrentPage(1);
      setTotal(0);
      changeQueryParams({ tab });
    }
  };

  const getOrderHistory = () => {
    if (user) {
      setLoading(true);
      OrderApi.get({
        page: currentPage,
        status: tab || activeTab,
        perPage: 8,
        user_id: user.id,
      })
        .then((res) => {
          setOrderHistory(res);
          setTotal(res.meta.total);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const updatePage = (p) => {
    setCurrentPage(p);
  };
  const getCount = (key) => {
    if (key === activeTab) {
      return total;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    getOrderHistory();
    if (tab) setActivetab(tab);

    () => removeQueryParams(["tab", "orderId"]);
  }, [tab, currentPage]);
  return (
    <>
      <SEO />
      <Nav tabs>
        {tabs.map((data) => (
          <NavItem key={data.tabId}>
            <NavLink
              className={classnames({ active: activeTab === data.tabId })}
              onClick={() => {
                toggle(data.tabId);
              }}
            >
              <div>{data.name}</div>
              {activeTab === data.tabId && (
                <div className="count">{getCount(data.tabId)}</div>
              )}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      {loading ? (
        <div className="container-full">
          <Spinner />
        </div>
      ) : (
        <TabContent activeTab={activeTab}>
          {tabs.map((data) => (
            <TabPane key={data.tabId} tabId={data.tabId}>
              <ListHeadeer activeTab={activeTab} />
              {orderHistory?.data?.map((order, key) => (
                <ListItem
                  key={key}
                  order={order}
                  setVisible={setVisible}
                  setCurrentOrderId={setCurrentOrderId}
                  activeTab={activeTab}
                  setModal={setModal}
                  setModalDetail={setModalDetail}
                />
              ))}
              {orderHistory?.data?.length <= 0 && (
                <RiveResult text="Items not found in this order status" />
              )}
            </TabPane>
          ))}
        </TabContent>
      )}
      <Drawer
        visible={visible}
        setVisible={(value) => {
          removeQueryParams(["orderId"]);
          setVisible(value);
        }}
        title="Order history"
      >
        <DeliveryStatus
          getOrderHistory={getOrderHistory}
          currentOrderId={currentOrderId}
          setVisible={(value) => {
            removeQueryParams(["orderId"]);
            setVisible(value);
          }}
        />
      </Drawer>
      {modal && (
        <RefundModal
          modal={modal}
          setModal={setModal}
          currentOrderId={currentOrderId}
          getOrderHistory={getOrderHistory}
        />
      )}
      {modalDetail && (
        <RefundDetailModal
          modalDetail={modalDetail}
          setModalDetail={setModalDetail}
          currentOrderId={currentOrderId}
        />
      )}
      {orderHistory?.data?.length > 0 && (
        <Pagination
          pageSize={8}
          onChange={updatePage}
          current={currentPage}
          total={orderHistory.meta.total}
          className="mt-4"
        />
      )}
    </>
  );
};

export default OrderHistory;
