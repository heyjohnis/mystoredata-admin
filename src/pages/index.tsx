import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function IndexPage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/trade/analysis");
  }, []);
  return <></>;
}
