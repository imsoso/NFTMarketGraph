import { Entity } from "@graphprotocol/graph-ts";
import {
  Cancel as CancelEvent,
  List as ListEvent,
  Sold as SoldEvent,
} from "../generated/NFTMKT/NFTMKT";
import { Cancel, OrderBook, FilledOrder } from "../generated/schema";

export function handleList(event: ListEvent): void {
  let entity = new OrderBook(event.params.orderId);
  entity.nft = event.params.nft;
  entity.tokenId = event.params.tokenId;
  entity.seller = event.params.seller;
  entity.payToken = event.params.payToken;
  entity.price = event.params.price;
  entity.deadline = event.params.deadline;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let sellOrderInfo = OrderBook.load(event.params.orderId);
  entity.filledTxHash = sellOrderInfo!.transactionHash;

  let cancelOrderInfo = Cancel.load(event.params.orderId);
  entity.cancelTxHash = cancelOrderInfo!.transactionHash;
  entity.save();
}

export function handleSold(event: SoldEvent): void {
  let entity = new FilledOrder(event.params.orderId);
  entity.buyer = event.params.buyer;
  entity.fee = event.params.fee;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleCancel(event: CancelEvent): void {
  let entity = new Cancel(event.params.orderId);
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
