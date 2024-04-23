import React from "react";
import { Button } from "@mantine/core";

class DownloadButton extends React.Component {
  downloadFile = () => {
    const { fileUrl } = this.props;
    const fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);

    fetch(fileUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Error :", error));
  };

  render() {
    return (
      <Button fullWidth color="#3366ff" onClick={this.downloadFile}>
        ดาวน์โหลดรูปภาพ
      </Button>
    );
  }
}

export default DownloadButton;
