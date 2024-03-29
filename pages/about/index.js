/* eslint-disable @next/next/no-img-element */
import React from "react";
import cls from "./appSection.module.scss";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { parseCookies } from "nookies";
import Footer from "../../components/footer";

export default function AppSection() {
  const { t } = useTranslation();
  const settings = parseCookies();
  return (
    <>
      <div className={`container ${cls.container} ${cls.bgGrey}`}>
        <div className={cls.wrapper}>
          <div className={cls.imgWrapper}>
            <Image
              fill
              src={"/assets/images/customer_app.png"}
              alt={"Foodyman"}
              sizes="(max-width: 768px) 600px, 1072px"
              layout="fill"
            />
          </div>
          <div className={cls.content}>
            <h1 className={cls.title}>Restaurant and grocery customer app</h1>
            <p className={cls.text}>{t("become.delivery.text")}</p>
            <div className={cls.flex}>
              <a
                href={settings?.customer_app_ios}
                className={cls.item}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/images/app-store.webp" alt="App store" />
              </a>
              <a
                href={settings?.customer_app_android}
                className={cls.item}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/images/google-play.webp" alt="Google play" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={`container ${cls.container}`}>
        <div className={`${cls.wrapper} ${cls.reverse}`}>
          <div className={cls.imgWrapper}>
            <Image
              fill
              src={"/assets/images/vendor_app.png"}
              alt={"Foodyman"}
              sizes="(max-width: 768px) 600px, 1072px"
              layout="fill"
            />
          </div>
          <div className={cls.content}>
            <h1 className={cls.title}>Restaurant and grocery vendor app</h1>
            <p className={cls.text}>{t("become.delivery.text")}</p>
            <div className={cls.flex}>
              <a
                href={settings?.vendor_app_ios}
                className={cls.item}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/images/app-store.webp" alt="App store" />
              </a>
              <a
                href={settings?.vendor_app_android}
                className={cls.item}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/images/google-play.webp" alt="Google play" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={`container ${cls.container} ${cls.bgGrey}`}>
        <div className={cls.wrapper}>
          <div className={cls.imgWrapper}>
            <Image
              fill
              src={"/assets/images/delivery_app.png"}
              alt={"Foodyman"}
              sizes="(max-width: 768px) 600px, 1072px"
              layout="fill"
            />
          </div>
          <div className={cls.content}>
            <h1 className={cls.title}>
              Restaurant and grocery deliveryman app
            </h1>
            <p className={cls.text}>{t("become.delivery.text")}</p>
            <div className={cls.flex}>
              <a
                href={settings?.delivery_app_ios}
                className={cls.item}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/images/app-store.webp" alt="App store" />
              </a>
              <a
                href={settings?.delivery_app_android}
                className={cls.item}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/assets/images/google-play.webp" alt="Google play" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
