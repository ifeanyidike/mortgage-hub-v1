"use server";

import broker from "@/server/broker";
import { Broker, ExistingUser } from "@/types/db";
import { BrokerUserData } from "@/types/general";

export async function fetchTopFiveBrokers() {
  return await broker.getTopBrokers();
}

export async function fetchAllBrokers() {
  return await broker.getAllBrokers();
}

export async function fetchBrokersByFields(
  city: string,
  province: string,
  title: string
) {
  return (await broker.getBrokersByFields(
    city,
    province,
    title
  )) as BrokerUserData[];
}

export async function fetchBroker(id: string) {
  return (await broker.getBrokerById(id)) as BrokerUserData;
}
