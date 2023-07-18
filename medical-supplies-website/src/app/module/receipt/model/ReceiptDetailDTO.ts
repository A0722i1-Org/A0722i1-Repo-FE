export class ReceiptDetailDTO {
  private productId: number;
  private quantity: number;

  constructor(productId: number, quantity: number) {
    this.productId = productId;
    this.quantity = quantity;
  }
}
