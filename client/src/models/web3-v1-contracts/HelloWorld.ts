/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type BN from "bn.js";
import type { ContractOptions } from "web3-eth-contract";
import type { EventLog } from "web3-core";
import type { EventEmitter } from "events";
import type {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

export interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type MessageChanged = ContractEventLog<{
  setter: string;
  0: string;
}>;

export interface HelloWorld extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): HelloWorld;
  clone(): HelloWorld;
  methods: {
    /**
     * Get the value
     */
    read(): NonPayableTransactionObject<string>;

    /**
     * Set the value
     * @param newValue Value
     */
    write(newValue: number | string | BN): NonPayableTransactionObject<void>;
  };
  events: {
    MessageChanged(cb?: Callback<MessageChanged>): EventEmitter;
    MessageChanged(
      options?: EventOptions,
      cb?: Callback<MessageChanged>
    ): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "MessageChanged", cb: Callback<MessageChanged>): void;
  once(
    event: "MessageChanged",
    options: EventOptions,
    cb: Callback<MessageChanged>
  ): void;
}