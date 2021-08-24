import React, { Component } from "react";
import { ModalService } from "../Modal/ModalService";
import TriggerButtonService from "../TriggerButton/TriggerButtonService";
export class Container extends Component {
  state = { isShown: false };
  showModal = () => {
    this.setState({ isShown: true }, () => {
      this.closeButton.focus();
    });
    this.toggleScrollLock();
  };
  closeModal = () => {
    this.setState({ isShown: false });
    this.TriggerButton.focus();
    this.toggleScrollLock();
  };
  onKeyDown = (event) => {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  };

  toggleScrollLock = () => {
    document.querySelector("html").classList.toggle("scroll-lock");
  };

  render() {
    return (
      <React.Fragment>
        <TriggerButtonService
          showModal={this.showModal}
          buttonRef={(n) => (this.TriggerButton = n)}
          triggerText={this.props.triggerText}
        />
        {this.state.isShown ? (
          <ModalService
            modalRef={(n) => (this.modal = n)}
            buttonRef={(n) => (this.closeButton = n)}
            closeModal={this.closeModal}
            onKeyDown={this.onKeyDown}
            value={this.props.value}
            history={this.props.history}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default Container;
