export function messageTransformer(message: ContractMessage) {
  return {
    sender: message.sender,
    text: message.text,
    username: message.username || null,
  }
}
