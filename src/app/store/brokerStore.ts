import { fetchBrokersByFields } from "@/actions/brokers";
import { BrokerUserData } from "@/types/general";
import { makeAutoObservable } from "mobx";

class BrokerStore {
  constructor() {
    makeAutoObservable(this);
  }

  brokers: BrokerUserData[] = [];
  public async searchBrokers(city: string, province: string, title: string) {
    const brokers = await fetchBrokersByFields(city, province, title);
    this.brokers = brokers;
  }
}

export const brokerStore = new BrokerStore();
