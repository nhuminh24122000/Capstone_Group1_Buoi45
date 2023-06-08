import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Suspense } from 'react'
import { Outlet } from "react-router-dom";
import { useScrollTop } from '../../hooks/useScrollTop';


export default function HomeTemplate() {
  useScrollTop();

  return (
    <React.Fragment>
      <Header />
      <Suspense fallback={<>Loading...</>}>
        <Outlet />
      </Suspense>
      <Footer />
    </React.Fragment>
  );
}
