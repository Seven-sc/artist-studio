import logo from './logo.svg';
import './App.css';
import { ethers } from "ethers";
import Lock from "./artifacts/contracts/Lock.sol/Lock.json";

const connect = async () => {

  let signer = null;

  let provider;
  if (window.ethereum == null) {
    console.log("MetaMask not installed; using read-only defaults")
    provider = ethers.getDefaultProvider()
  } else {
    provider = new ethers.BrowserProvider(window.ethereum)
    signer = await provider.getSigner();
    console.log("signer", signer);
  }
}

const readMessage = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const lock = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", Lock.abi, provider);
    const message = await lock.message();
    alert(message)

}

const setMessage = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);

  await provider.send("eth_requestAccounts", []);

    const signer = await provider.getSigner()

    let lock = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", Lock.abi, signer);
    let transaction = await lock.connect(signer).setMessage("world helloxxxx");
    let tx = await transaction.wait(1);
    //debugger
    // let event = tx.events[0];
    // let value = event.args[0];

    // let message = value.toString();
    // alert(message)

     // 从交易日志中获取事件数据
     const log = tx.logs[0]; // 假设第一个日志是目标事件
     try {
       // 使用合约接口解析日志，确保事件格式正确
       const event = lock.interface.parseLog(log);
       const value = event.args[0];
       const message = value.toString();
       alert(message); // 弹出事件中的消息
     } catch (error) {
       console.error("Failed to parse event log:", error);
     }
}

function App() {
  return (
    <div className="App">
      <button onClick={connect}>connect wallet</button>
      <button onClick={readMessage}>readMessage</button>
      <button onClick={setMessage}>setMessage</button>
    </div>
  );
}

export default App;
