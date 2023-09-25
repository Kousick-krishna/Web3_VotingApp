import {useState,useEffect} from "react";
import {ethers} from "ethers";
import Login from './components/Login';
import Connected from "./components/Connected";
import Finished from "./components/Finished";
import './App.css';
import {ContractAddress,ContractABI} from './constants/constant'


function App() {
  const [provider,setProvider] = useState(null);
  const [account,setAccount] = useState(null);
  const [connected,setIsConnected]= useState(false);
  const [status, setStatus] = useState(true);
  const [time,setTime] = useState('');
  const [canditates,setCanditates] = useState([]);
  const [votes,setCanvotes] = useState(true);
  const [number,setNumber] = useState();

  useEffect(() =>{
    getStatus();
    gettime();
    getCandidates();
    if(window.ethereum){
      window.ethereum.on("accountschanged", handleAccountschanged);
    }

    return() =>{
      window.ethereum.removeListener("accountsChanged", handleAccountschanged);
    }
  });
  
  function handleAccountschanged(accounts){
    if(accounts.length > 0 && account != accounts[0]){
      setAccount(accounts[0]);
    }
    else{
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function getStatus(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send("eth_requestAccounts",[]);
    const signer =  provider.getSigner();
    const ContractInstance = new ethers.Contract(
      ContractAddress,ContractABI,signer
    );
    const status = await ContractInstance.getcurrentstatus();
    console.log(status);
    setStatus(status); 
  }

  async function gettime(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send("eth_requestAccounts",[]);
    const signer =  provider.getSigner();
    const ContractInstance = new ethers.Contract(
      ContractAddress,ContractABI,signer
    );
    const time = await ContractInstance.getremainingtime();
    setTime(parseInt(time,16));
  }
  async function getCandidates(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send("eth_requestAccounts",[]);
    const signer =  provider.getSigner();
    const ContractInstance = new ethers.Contract(
      ContractAddress,ContractABI,signer
    );
    const candidatesList = await ContractInstance.getAllvotes();
    const finalList = await candidatesList.map((candidate,index)=> {
      return{
        index:index,
        name: candidate.name,
        voteCount : candidate.voteCount.toNumber()
      }
    });
    setCanditates(finalList);
   }

   async function canVote(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send("eth_requestAccounts",[]);
    const signer =  provider.getSigner();
    const ContractInstance = new ethers.Contract(
      ContractAddress,ContractABI,signer
    );
    const votestatus = await ContractInstance.voters(await signer.getAddress());
    setCanvotes(votestatus);
   }

   async function vote(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send("eth_requestAccounts",[]);
    const signer =  provider.getSigner();
    const ContractInstance = new ethers.Contract(
      ContractAddress,ContractABI,signer
    );
    const tx = await ContractInstance.vote(number);
    await tx.wait();
    canVote();
   }

  async function ConnecttoMetamask(){
  if(window.ethereum){
    try{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    provider.send("eth_requestAccounts",[]);
    const signer =  provider.getSigner();
    const address = await signer.getAddress();
    setAccount(address)
    console.log("metamask connected to" + address);
    setIsConnected(true);
  }
  catch(err){
    console.log(err);
  }
  }
  else{
    console.log("you are not connected to metamask")
  }
}

async function handleNumberChange(e){
  setNumber(e.target.value);
}
  return (
    <div>
      {status ? (connected ? 
                (<Connected
                account = {account}
                time = {time}
                canditates = {canditates}
                handleNumberChange ={handleNumberChange}
                number = {number}
                voteFunction ={vote}
                showButton = {canVote}
                />) :
                (<Login connectWallet={ConnecttoMetamask} />) ): <Finished/>}
    </div>
  );
}

export default App;
