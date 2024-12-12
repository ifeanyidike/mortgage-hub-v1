import { fetchBrokerByUserId, fetchBrokersByFields } from "@/actions/brokers";
import { BrokerData, BrokerUserData } from "@/types/general";
import { makeAutoObservable } from "mobx";

class BrokerStore {
  constructor() {
    makeAutoObservable(this);
  }

  brokers: BrokerUserData[] | null = null;
  broker_profile?: BrokerData;
  public async searchBrokers(city: string, province: string, title: string) {
    const brokers = await fetchBrokersByFields(city, province, title);
    this.brokers = brokers;
  }

  public async loadBrokerProfile(user_id: string) {
    const brokerProfile = await fetchBrokerByUserId(user_id);

    this.broker_profile = brokerProfile;
  }
}

export const brokerStore = new BrokerStore();
