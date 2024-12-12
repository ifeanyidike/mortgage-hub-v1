"use client";
import React, { Fragment } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
} from "@/app/dashboard-components/modal"; // Import your custom Modal component
import { KeenIcon } from "@/app/dashboard-components";
import { cn, downloadSingleFile } from "@/app/utils";
import FileViewer from "react-file-viewer";
import { Documents } from "@/types/db";

interface IModalProfileProps {
  selectedDocument: Documents;
  onClose: () => void;
}

function getFileExt(filename: string): string {
  return filename.split(".").pop() || "jpg";
}

const SingleFileViewer = ({
  selectedDocument,
  onClose,
}: IModalProfileProps) => {
  return (
    <Fragment>
      <Modal
        open={!!selectedDocument}
        onClose={onClose}
        className="!flex interfont !h-screen"
      >
        <ModalContent className="container-fixed p-0 relative scrollable-y">
          {/* Header with Close Button */}
          <ModalHeader
            className={cn(
              "modal-rounded-t p-0 border-0 relative flex items-center justify-between bg-center bg-cover bg-no-repeat modal-bg"
            )}
          >
            <div className="flex flex-col text-black justify-end px-6 py-4 w-full bg-gradient-to-t from-light to-transparent">
              <h2 className="text-lg font-semibold text-white">
                {selectedDocument?.name || "Untitled Document"}
              </h2>
              <p className="text-sm text-white/80">
                {selectedDocument?.description || "No description available."}
              </p>
            </div>
            <button
              className="btn btn-sm btn-icon btn-light btn-outline absolute top-5 right-5 lg:mr-10 shadow-default z-10"
              onClick={onClose}
            >
              <KeenIcon icon="cross" />
            </button>
          </ModalHeader>

          {/* Body with File Viewer */}
          <ModalBody className="p-6 flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-4">
              <button
                className="btn btn-primary text-white px-6 py-2 rounded-md"
                onClick={() => downloadSingleFile(selectedDocument)}
              >
                Download
              </button>
            </div>

            {/* Centered File Viewer */}
            <div className="grow bg-white shadow-md rounded-md p-4 w-full max-w-3xl h-[80vh] overflow-auto text-center">
              <FileViewer
                style={{}}
                // className="w-full h-full"
                fileType={getFileExt(selectedDocument.url)}
                filePath={selectedDocument.url}
                errorComponent={
                  <div className="text-red-500 text-center">
                    An error occurred while loading the file.
                  </div>
                }
                onError={(e: any) =>
                  console.log("An error occurred when opening the file", e)
                }
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default SingleFileViewer;
