"use client";

import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
} from "@/app/dashboard-components/modal";
import { KeenIcon } from "@/app/dashboard-components";
import { LeadPurchaseCard } from "./LeadPurchaseCard";
import { LeadDataMore } from "@/app/store/leadStore";

interface IModalWelcomeMessageProps {
  data: LeadDataMore;
  open: boolean;
  onClose: () => void;
}

const LeadPurchaseModal = ({
  data,
  open,
  onClose,
}: IModalWelcomeMessageProps) => {
  const card_content = {
    ...data,
    bgImage: "bg-7.png",
    avatar: {
      className: "size-20 shrink-0 relative",
      image: data?.user.picture,
      imageClass: "rounded-full",
      badgeClass:
        "flex size-2.5 bg-gray-400 rounded-full ring-2 ring-light absolute bottom-0.5 start-16 transform -translate-y-1/2",
    },
  };
  //   const card_content = {
  //     bgImage: "bg-7.png",
  //     avatar: {
  //       className: "size-20 shrink-0 relative",
  //       image: "300-17.png",
  //       imageClass: "rounded-full",
  //       badgeClass:
  //         "flex size-2.5 bg-gray-400 rounded-full ring-2 ring-light absolute bottom-0.5 start-16 transform -translate-y-1/2",
  //     },
  //     name: "Jacob Jones",
  //     email: "@jacobeth_99",
  //     info: "0x5nB3..0sG9Q",
  //     statistics: [
  //       {
  //         total: "2 ETH",
  //         description: "Sales",
  //       },
  //       {
  //         total: "68",
  //         description: "Items",
  //       },
  //       {
  //         total: "74%",
  //         description: "Listed",
  //       },
  //     ],
  //   };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent className="modal-center w-full max-w-[500px] modal-class modal-content relative">
        {/* {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full  bg-gray-100/50 grid place-items-center z-10">
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
            />
          </div>
        )} */}
        <ModalHeader className="flex justify-between items-center border-b pb-2">
          <h2 className="font-bold text-gray-800">Buy lead</h2>
          <button
            className="btn btn-sm btn-icon btn-light btn-clear"
            onClick={onClose}
          >
            <KeenIcon icon="cross" />
          </button>
        </ModalHeader>
        <ModalBody className="space-y-6">
          <LeadPurchaseCard {...card_content} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { LeadPurchaseModal };
