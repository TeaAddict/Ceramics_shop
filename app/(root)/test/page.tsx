"use client";

import MerchandiseCard from "@/components/cards/Merchandise";
import Merchandise from "@/components/cards/Merchandise";
import PaginationCn from "@/components/shared/PaginationCn";
import Test from "@/components/shared/Test";
import { TEST_MERCHANDISE, TEST_MERCHANDISE2 } from "@/constants";
import React from "react";

const TestPage = () => {
  return (
    <div className="padding container">
      <ul className="grid grid-cols-6 justify-center">
        {TEST_MERCHANDISE2.map((item) => {
          return (
            <li className="m-3" key={item.title}>
              <MerchandiseCard
                href="#"
                cardType="shop"
                currencyType={item.currencyType}
                description={item.description}
                thumbnailImage={item.thumbnailImage}
                price={item.price}
                title={item.title}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TestPage;
