import React, { Fragment } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Suspense } from 'react'
import { Outlet } from "react-router-dom";
import HeaderHomeTemplate from "../HeaderHomeTemplate/HeaderHomeTemplate";

export default function HomeTemplate() {
  return (
    <Fragment>
      <HeaderHomeTemplate />
      <div
				style={{
					minHeight: '75vh',
				}}>
				{/* fallback: hiển thị trong lúc đợi component tải xong */}
				<Suspense fallback={<>Loading...</>}>
					<Outlet />
				</Suspense>
			</div>
      <footer
				style={{
					background: 'black',
					padding: 30,
					color: 'white',
				}}>
				Footer
			</footer>
    </Fragment>
  );
}
