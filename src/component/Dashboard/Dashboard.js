import React, {useEffect, useRef, useState} from "react";
import ClipboardJS from 'clipboard';
import {
  CHDiv,
  ContainerFBGpd,
  DHDiv,
  DetailsDiv,
  FilterDiv,
  FliterIcon,
  LabelHeaderD,
  SpentCard,
  THDiv,
  W5Label,
  W1Label,
  W2Label,
  W3Label,
  W4Label,
  WSDiv,
  WSDiv2,
  WSDiv3,
  WSDiv4,
  WSDiv5,
  WalletCard,
  W6Label,
  BankLogo,
  WSDiv7,
  WSDiv6,
  CreditIcon,
  W7Label,
  W8Label,
  DebitIcon,
  CopyIcon,
} from "../Styled/Styled";
import WalletSvg from '../../asset/dashboardicon/Iconwallet.svg';
import SendSvg from '../../asset/dashboardicon/Iconsend.svg';
import CopySvg from '../../asset/dashboardicon/Iconcopy.svg';
import GtbSvg from '../../asset/dashboardicon/Uniongtb.svg';
import FirstSvg from '../../asset/dashboardicon/Unionfirst.svg';
import FcmbSvg from '../../asset/dashboardicon/Unionfcmb.svg';
import Graph from "./Graph";
import {useStateContext} from "../Context/ContextProvider";
import axios from "axios";
import Reveal from "../Reveal/Reveal";
import RevealAppear from "../Reveal/RevealAppear";

const Dashboard = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [bank, setBank] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [amountSpent, setAmountSpent] = useState("");

  const context = useStateContext();

  useEffect(() =>{
    const getProfile = async () =>{

      const token = "Bearer "+context.token;

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': token
      };

      await axios.get('http://localhost:9000/api/v1/user/profile/get-profile', { headers })
          .then(response => {
            const data = response.data;
            setAccountNumber(data.accountNumber)
            setBank(data.bank)
            setAccountBalance(data.accountBalance)
            setAmountSpent(data.amountSpent)
            console.log(response.data)
          })
          .catch(error => {
            console.log(error);
          });
    };
    getProfile();
  }, [context.token]);


  const textToCopy = useRef();

  const handleCopyToClipboard = () => {
    const text = textToCopy.current.innerText;

    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;
    document.body.appendChild(tempTextArea);

    tempTextArea.select();
    document.execCommand('copy');

    document.body.removeChild(tempTextArea);

    // alert('Copied to clipboard!');
  };

  return (
      <ContainerFBGpd>
        <DHDiv>
          <LabelHeaderD>Dashboard</LabelHeaderD>

          <DetailsDiv>

            
            <WalletCard>
              <RevealAppear>
                <img src={WalletSvg} alt="Logo" style={{ marginRight: '34px' }} />
              </RevealAppear>
              <WSDiv>
                <WSDiv2>
                  
                    <W1Label><Reveal>Account Balance</Reveal></W1Label>
                  
                  
                    <W2Label><Reveal>N500,000,000 {accountBalance}</Reveal></W2Label>

                </WSDiv2>

                  <WSDiv2>
                    <W3Label><Reveal>Wema Bank{bank}</Reveal></W3Label>
                    
                    <Reveal>
                      <WSDiv3>
                        <W1Label ref={textToCopy}>1234567890{accountNumber}</W1Label>
                        <CopyIcon onClick={handleCopyToClipboard} />
                      </WSDiv3>
                    </Reveal>
                    
                  </WSDiv2>
              </WSDiv>
            </WalletCard>

            
            <SpentCard>
              <RevealAppear>
                <img src={SendSvg} alt="Logo" style={{ marginRight: '34px' }} />
              </RevealAppear>
              <WSDiv>
                <WSDiv2>
                  <W1Label><Reveal>Amount Spent</Reveal></W1Label>
                  <W2Label><Reveal>N65,000,000</Reveal></W2Label>
                </WSDiv2>

                <WSDiv2>
                  <W1Label><Reveal>Monthly percentage</Reveal></W1Label>
                  <W4Label><Reveal>0.5% - 2%</Reveal></W4Label>
                </WSDiv2>
              </WSDiv>
            </SpentCard>


          </DetailsDiv>
        </DHDiv>

        {/* -----------------------------Chart Graph */}
        
          <CHDiv>
            <Reveal>
              <Graph />
            </Reveal>
          </CHDiv>
        

        {/* -----------------------------Transaction History */}
        
        <THDiv>
          <Reveal>
          <WSDiv>
            <WSDiv4>
              Transaction History
              <FilterDiv>
                <FliterIcon />
                Filter
              </FilterDiv>
            </WSDiv4>

            <WSDiv5>
              {/* -----------------------------Line 1 */}
              <WSDiv4>
                <WSDiv3>
                  <BankLogo src={GtbSvg} />
                  <WSDiv2>
                    <W5Label>Victor Abimbola</W5Label>
                    <W6Label>Money for others</W6Label>
                  </WSDiv2>
                </WSDiv3>
                <WSDiv7>
                  <WSDiv6>
                    <W6Label>4/11/2022&nbsp;4:46PM</W6Label>
                    <W7Label>N2,000.00</W7Label>
                  </WSDiv6>
                  <CreditIcon />
                </WSDiv7>
              </WSDiv4>
              {/* -----------------------------Line 2 */}
              <WSDiv4>
                <WSDiv3>
                  <BankLogo src={FirstSvg} />
                  <WSDiv2>
                    <W5Label>Victor Abimbola</W5Label>
                    <W6Label>Others</W6Label>
                  </WSDiv2>
                </WSDiv3>
                <WSDiv7>
                  <WSDiv6>
                    <W6Label>4/11/2022&nbsp;4:46PM</W6Label>
                    <W8Label>N3,500.00</W8Label>
                  </WSDiv6>
                  <DebitIcon />
                </WSDiv7>
              </WSDiv4>
              {/* -----------------------------Line 3 */}
              <WSDiv4>
                <WSDiv3>
                  <BankLogo src={FcmbSvg} />
                  <WSDiv2>
                    <W5Label>Victor Abimbola</W5Label>
                    <W6Label>Food</W6Label>
                  </WSDiv2>
                </WSDiv3>
                <WSDiv7>
                  <WSDiv6>
                    <W6Label>4/11/2022&nbsp;4:46PM</W6Label>
                    <W7Label>N2,000.00</W7Label>
                  </WSDiv6>
                  <CreditIcon />
                </WSDiv7>
              </WSDiv4>
            </WSDiv5>
          </WSDiv>
          </Reveal>
        </THDiv>
        
      </ContainerFBGpd>
  );
};

export default Dashboard;
