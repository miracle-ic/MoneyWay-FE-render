import { useState } from "react";
import LocalTransfer from "./LocalTransfer";
import OtherBankTransfer from "./OtherBankTransfer";
import Beneficiary from "./Beneficiary";
import {
  ButtonTab,
  ButtonTabT,
  ContainerFBG,
  ContainerFBGpd,
  FormCard,
  LabelHeader,
  LabelHeaderT,
  TabDiv,
  TabDivT,
  TogDiv,
} from "../Styled/Styled";

const Transfer = () => {
  const [activeTab, setActiveTab] = useState("Transfer");
  const [tabDisplay, setTabDisplay] = useState(<LocalTransfer />);
  const [buttonStyles, setButtonStyles] = useState("");
  const buttonStyle = {
    borderBottom: "3px solid purple",
    color: "#3538CD",
  };

  const handleTransferTypeSelect = (selectedTransfer) => {
    if (selectedTransfer.target.id === "other-bank") {
      setActiveTab("Other Bank Transfer");
      setTabDisplay(<OtherBankTransfer />);
    } else if (selectedTransfer.target.id === "beneficiary") {
      setActiveTab("Beneficiary");
      setTabDisplay(<Beneficiary />);
    } else {
      setActiveTab("Transfer");
      setTabDisplay(<LocalTransfer />);
    }
  };

  // new line ------
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <ContainerFBGpd>
      <LabelHeaderT className={toggleState === 1 ? "active" : ""}>
        Transfer
      </LabelHeaderT>

      <LabelHeaderT className={toggleState === 2 ? "active" : ""}>
        Other Banks
      </LabelHeaderT>

      <LabelHeaderT className={toggleState === 3 ? "active" : ""}>
        Beneficiary
      </LabelHeaderT>

      {/* The Card starts here --------- */}

      <FormCard>
        <TabDivT>
          <ButtonTab
            className={toggleState === 1 ? "active" : ""}
            onClick={() => toggleTab(1)}
          >
            Local Transfer
          </ButtonTab>

          <ButtonTab
            className={toggleState === 2 ? "active" : ""}
            onClick={() => toggleTab(2)}
          >
            Other Bank Transfer
          </ButtonTab>

          <ButtonTabT
            className={toggleState === 3 ? "active" : ""}
            onClick={() => toggleTab(3)}
          >
            Beneficiary
          </ButtonTabT>
        </TabDivT>

        <TogDiv
            className={toggleState === 1 ? "active" : ""}
        >
            <LocalTransfer />
        </TogDiv>

        <TogDiv
            className={toggleState === 2 ? "active" : ""}
        >
            <OtherBankTransfer />
        </TogDiv>

        <TogDiv
            className={toggleState === 3 ? "active" : ""}
        >
            <Beneficiary />
        </TogDiv>
      </FormCard>
    </ContainerFBGpd>
  );
};

export default Transfer;
