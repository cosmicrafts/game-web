"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UseButton = exports.TransferLinkButton = exports.RechargeButton = exports.NFTThumbLarge = exports.NFTThumb = exports.NFTProInfo = exports.NFTPreview = exports.NFTPopover = exports.NFTPage = exports.NFTMenu = exports.NFTLarge = exports.NFTInfo = exports.NFTContent = exports.NFTClaim = exports.NFTBattery = exports.NFT = exports.BuyButton = exports.BurnButton = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@chakra-ui/react");

var _items = require("@vvv-interactive/nftanvil-tools/cjs/items.js");

var _nft = require("../reducers/nft");

var _inventory = require("../reducers/inventory");

var _History = require("./History");

var _Confetti = _interopRequireDefault(require("./Confetti"));

var _LoginRequired = require("./LoginRequired");

var _reactToastify = require("react-toastify");

var _lodash = _interopRequireDefault(require("lodash"));

var _token = require("@vvv-interactive/nftanvil-tools/cjs/token.js");

var _index = require("../index.js");

var _icons = require("../icons");

var _moment = _interopRequireDefault(require("moment"));

var _styled = _interopRequireDefault(require("@emotion/styled"));

var _default = _interopRequireDefault(require("../assets/default.png"));

var _over = _interopRequireDefault(require("../assets/over.png"));

var AccountIdentifier = _interopRequireWildcard(require("@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js"));

var TransactionId = _interopRequireWildcard(require("@vvv-interactive/nftanvil-tools/cjs/transactionid.js"));

var _principal = require("@dfinity/principal");

var _TransactionToast = require("../components/TransactionToast");

var _Code = require("./Code");

var _data = require("@vvv-interactive/nftanvil-tools/cjs/data.js");

var _config = require("../config.js");

var _pricing = require("@vvv-interactive/nftanvil-tools/cjs/pricing.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ContentBox = _styled.default.div`
  margin: 12px 0px;

  video,
  img {
    max-width: 85vw;
    max-height: 85vh;
    margin-bottom: 5vh;
    margin-top: 1vh;
    border-radius: 6px;
  }
`;
const Thumb = _styled.default.div`
  width: 72px;
  height: 72px;
  border-radius: 6px;
  position: relative;
  box-overflow: hidden;

  .border {
    top: 0px;
    left: 0px;
    position: absolute;
    background: url(${_default.default});
    background-size: 72px 72px;
    width: 72px;
    height: 72px;

    &:hover {
      background-image: url(${_over.default});
    }
  }
  .custom {
    top: 0px;
    left: 0px;
    position: absolute;
    margin: 4px 4px;
    object-fit: cover;
    object-position: center center;
    height: 64px;
    width: 64px;
    border-radius: 8px;
  }
`;
const ThumbLarge = _styled.default.div`
  width: 216px;
  height: 270px;
  position: relative;
  box-overflow: hidden;

  .custom {
    top: 0px;
    left: 0px;
    position: absolute;
    object-fit: cover;
    object-position: center center;
    height: 216px;
    width: 216px;
    border-radius: 8px 8px 0px 0px;
  }

  .info {
    font-size: 12px;
    position: absolute;
    padding-bottom: 3px;
    padding-left: 10px;
    border-radius: 0px 0px 6px 6px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    height: 54px;
    // text-shadow: 4px 4px 2px rgba(0, 0, 0, 0.6);
    background: ${props => props.mode === "light" ? "#fff" : "#1d1b24"};
    border: 1px solid
      ${props => props.mode === "light" ? "#c4bcdb" : "#3f3855"};
    border-top: 0px solid;
    .label {
      font-size: 9px;
      margin-bottom: -2px;
    }
    .collection {
      position: absolute;
      top: 0px;
    }
    .author {
      position: absolute;
      top: 19px;
    }
    .price {
      text-align: right;
      position: absolute;
      top: 19px;
      right: 8px;
    }
  }
`;

const NFTMenu = _ref => {
  let {
    id,
    meta,
    owner,
    nobuy = false
  } = _ref;
  const pro = (0, _index.useAnvilSelector)(state => state.user.pro);
  return /*#__PURE__*/_react.default.createElement(_react2.Box, {
    p: 3,
    maxWidth: "375px",
    textAlign: "justify"
  }, owner ? /*#__PURE__*/_react.default.createElement(_react2.Wrap, {
    spacing: "3"
  }, /*#__PURE__*/_react.default.createElement(UseButton, {
    id: id,
    meta: meta
  }), pro ? /*#__PURE__*/_react.default.createElement(RechargeButton, {
    id: id,
    meta: meta
  }) : null, /*#__PURE__*/_react.default.createElement(TransferButton, {
    id: id,
    meta: meta
  }), pro ? /*#__PURE__*/_react.default.createElement(ApproveButton, {
    id: id,
    meta: meta
  }) : null, /*#__PURE__*/_react.default.createElement(TransferLinkButton, {
    id: id,
    meta: meta
  }), /*#__PURE__*/_react.default.createElement(SetPriceButton, {
    id: id,
    meta: meta
  }), pro ? /*#__PURE__*/_react.default.createElement(BurnButton, {
    id: id,
    meta: meta
  }) : null, pro ? /*#__PURE__*/_react.default.createElement(SocketButton, {
    id: id,
    meta: meta
  }) : null, pro ? /*#__PURE__*/_react.default.createElement(UnsocketButton, {
    id: id,
    meta: meta
  }) : null) : /*#__PURE__*/_react.default.createElement(_react2.Wrap, null, !nobuy && meta.transferable && meta.price.amount !== "0" ? /*#__PURE__*/_react.default.createElement(_LoginRequired.LoginRequired, {
    label: "Authenticate to buy"
  }, /*#__PURE__*/_react.default.createElement(BuyButton, {
    id: id,
    meta: meta
  })) : null));
};

exports.NFTMenu = NFTMenu;

function SetPriceButton(_ref2) {
  let {
    id,
    meta
  } = _ref2;
  const {
    isOpen,
    onOpen,
    onClose
  } = (0, _react2.useDisclosure)();
  const dispatch = (0, _index.useAnvilDispatch)();
  const address = (0, _index.useAnvilSelector)(state => state.user.address);

  const initialRef = _react.default.useRef();

  const removeSale = async () => {
    onClose();
    let toastId = (0, _reactToastify.toast)("Removing from sale...", {
      type: _reactToastify.toast.TYPE.INFO,
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false
    });
    let price = {
      amount: 0,
      marketplace: [{
        address: AccountIdentifier.TextToArray(_config.MARKETPLACE_AID),
        share: _config.MARKETPLACE_SHARE
      }]
    };

    try {
      await dispatch((0, _nft.nft_set_price)({
        id,
        price
      }));

      _reactToastify.toast.update(toastId, {
        type: _reactToastify.toast.TYPE.SUCCESS,
        isLoading: false,
        render: /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, "Removed from sale.")),
        autoClose: 9000,
        pauseOnHover: true
      });
    } catch (e) {
      console.error("Remove from sale error", e);

      _reactToastify.toast.update(toastId, {
        type: _reactToastify.toast.TYPE.ERROR,
        isLoading: false,
        closeOnClick: true,
        render: /*#__PURE__*/_react.default.createElement(_TransactionToast.TransactionFailed, {
          title: "Removing from sale failed",
          message: e.message
        })
      });
    }
  };

  const setPriceOk = async () => {
    let priceval = parseFloat(initialRef.current.value);
    let amount = AccountIdentifier.icpToE8s(priceval / (1 - (_config.MARKETPLACE_SHARE + _config.ANVIL_SHARE + meta.authorShare) / 10000));
    let price = {
      amount: amount,
      marketplace: [{
        address: AccountIdentifier.TextToArray(_config.MARKETPLACE_AID),
        share: _config.MARKETPLACE_SHARE
      }]
    };
    console.log(price);
    onClose();
    let toastId = (0, _reactToastify.toast)("Setting price...", {
      type: _reactToastify.toast.TYPE.INFO,
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false
    });

    try {
      await dispatch((0, _nft.nft_set_price)({
        id,
        price
      }));

      _reactToastify.toast.update(toastId, {
        type: _reactToastify.toast.TYPE.SUCCESS,
        isLoading: false,
        render: /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, "Setting price successfull.")),
        autoClose: 9000,
        pauseOnHover: true
      });
    } catch (e) {
      console.error("SetPrice error", e);

      _reactToastify.toast.update(toastId, {
        type: _reactToastify.toast.TYPE.ERROR,
        isLoading: false,
        closeOnClick: true,
        render: /*#__PURE__*/_react.default.createElement(_TransactionToast.TransactionFailed, {
          title: "Setting price failed",
          message: e.message
        })
      });
    }
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    onClick: onOpen
  }, "Sell"), /*#__PURE__*/_react.default.createElement(_react2.Modal, {
    initialFocusRef: initialRef,
    onClose: onClose,
    isOpen: isOpen,
    isCentered: true,
    size: "xl",
    preserveScrollBarGap: true
  }, /*#__PURE__*/_react.default.createElement(_react2.ModalOverlay, null), /*#__PURE__*/_react.default.createElement(_react2.ModalContent, null, /*#__PURE__*/_react.default.createElement(_react2.ModalHeader, null, "Set Sell Price"), /*#__PURE__*/_react.default.createElement(_react2.ModalCloseButton, null), /*#__PURE__*/_react.default.createElement(_react2.ModalBody, null, /*#__PURE__*/_react.default.createElement(_react2.FormControl, null, /*#__PURE__*/_react.default.createElement(_react2.FormLabel, null, "Price in ", /*#__PURE__*/_react.default.createElement(_Code.ICP, null)), /*#__PURE__*/_react.default.createElement(_react2.NumberInput, {
    w: "100%",
    precision: 4,
    step: 0.01 //max="0.12"
    ,
    min: "0",
    variant: "filled"
  }, /*#__PURE__*/_react.default.createElement(_react2.NumberInputField, {
    ref: initialRef
  }), /*#__PURE__*/_react.default.createElement(_react2.NumberInputStepper, null, /*#__PURE__*/_react.default.createElement(_react2.NumberIncrementStepper, null), /*#__PURE__*/_react.default.createElement(_react2.NumberDecrementStepper, null)))), /*#__PURE__*/_react.default.createElement(_react2.Box, {
    fontSize: "12px",
    mt: 2
  }, /*#__PURE__*/_react.default.createElement(_react2.Text, null, "The amount you specify is increased by:"), /*#__PURE__*/_react.default.createElement(_react2.Text, null, (_config.MARKETPLACE_SHARE / 100).toFixed(2), "% Marketplace share."), /*#__PURE__*/_react.default.createElement(_react2.Text, null, (_config.ANVIL_SHARE / 100).toFixed(2), "% Anvil protocol share."), /*#__PURE__*/_react.default.createElement(_react2.Text, null, (meta.authorShare / 100).toFixed(2), "% NFT author share."), /*#__PURE__*/_react.default.createElement(_react2.Text, null, "Additional flat recharge fee if it's not fully charged."))), /*#__PURE__*/_react.default.createElement(_react2.ModalFooter, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/_react.default.createElement(_react2.Button, {
    ml: 3,
    onClick: removeSale
  }, "Remove from sale"), /*#__PURE__*/_react.default.createElement(_react2.Button, {
    ml: 3,
    onClick: setPriceOk
  }, "Set for sale")))));
}

function TransferButton(_ref3) {
  let {
    id,
    meta
  } = _ref3;
  const {
    isOpen,
    onOpen,
    onClose
  } = (0, _react2.useDisclosure)();

  const [alertOpen, setAlertOpen] = _react.default.useState(false);

  const dispatch = (0, _index.useAnvilDispatch)();

  const initialRef = _react.default.useRef();

  const confirmOk = async () => {
    let toAddress = initialRef.current.value.toUpperCase();
    onClose();
    await dispatch((0, _nft.nft_transfer)({
      id,
      toAddress
    }));
  };

  const transferOk = async () => {
    let toAddress = initialRef.current.value.toUpperCase();

    if (toAddress.toLowerCase().indexOf("a00") !== 0) {
      setAlertOpen(true);
      return;
    }

    onClose();
    await dispatch((0, _nft.nft_transfer)({
      id,
      toAddress
    }));
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    onClick: onOpen,
    isDisabled: !meta.transferable
  }, "Transfer"), /*#__PURE__*/_react.default.createElement(_react2.AlertDialog, {
    isOpen: alertOpen,
    preserveScrollBarGap: true
  }, /*#__PURE__*/_react.default.createElement(_react2.AlertDialogOverlay, null, /*#__PURE__*/_react.default.createElement(_react2.AlertDialogContent, null, /*#__PURE__*/_react.default.createElement(_react2.AlertDialogHeader, {
    fontSize: "lg",
    fontWeight: "bold"
  }, /*#__PURE__*/_react.default.createElement(_react2.Alert, {
    status: "error"
  }, /*#__PURE__*/_react.default.createElement(_react2.AlertIcon, null), /*#__PURE__*/_react.default.createElement(_react2.AlertTitle, null, " ", "Warning!", /*#__PURE__*/_react.default.createElement("br", null), "Address may not support this NFT"))), /*#__PURE__*/_react.default.createElement(_react2.AlertDialogBody, null, "All NFTAnvil addresses start with A00 and this one doesn't. If you send to such address you may not be able to access your NFT."), /*#__PURE__*/_react.default.createElement(_react2.AlertDialogFooter, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    onClick: () => setAlertOpen(false)
  }, "Cancel"), /*#__PURE__*/_react.default.createElement(_react2.Button, {
    colorScheme: "red",
    onClick: confirmOk,
    ml: 3
  }, "Send anyway"))))), /*#__PURE__*/_react.default.createElement(_react2.Modal, {
    initialFocusRef: initialRef,
    onClose: onClose,
    isOpen: isOpen,
    isCentered: true,
    size: "xl",
    preserveScrollBarGap: true
  }, /*#__PURE__*/_react.default.createElement(_react2.ModalOverlay, null), /*#__PURE__*/_react.default.createElement(_react2.ModalContent, null, /*#__PURE__*/_react.default.createElement(_react2.ModalHeader, null, "Send NFT"), /*#__PURE__*/_react.default.createElement(_react2.ModalCloseButton, null), /*#__PURE__*/_react.default.createElement(_react2.ModalBody, null, /*#__PURE__*/_react.default.createElement(_react2.FormControl, null, /*#__PURE__*/_react.default.createElement(_react2.FormLabel, null, "To Address"), /*#__PURE__*/_react.default.createElement(_react2.Input, {
    ref: initialRef,
    placeholder: "50e3df3..."
  }))), /*#__PURE__*/_react.default.createElement(_react2.ModalFooter, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/_react.default.createElement(_react2.Button, {
    ml: 3,
    onClick: transferOk
  }, "Send")))));
}

function ApproveButton(_ref4) {
  let {
    id,
    meta
  } = _ref4;
  const {
    isOpen,
    onOpen,
    onClose
  } = (0, _react2.useDisclosure)();
  const dispatch = (0, _index.useAnvilDispatch)();

  const initialRef = _react.default.useRef();

  const approveOk = async () => {
    let spender = _principal.Principal.fromText(initialRef.current.value);

    onClose();
    let toastId = (0, _reactToastify.toast)("Approving...", {
      type: _reactToastify.toast.TYPE.INFO,
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false
    });

    try {
      let {
        transactionId
      } = await dispatch((0, _nft.nft_approve)({
        id,
        spender
      }));

      _reactToastify.toast.update(toastId, {
        type: _reactToastify.toast.TYPE.SUCCESS,
        isLoading: false,
        render: /*#__PURE__*/_react.default.createElement(_TransactionToast.TransactionToast, {
          title: "Approve successfull",
          transactionId: transactionId
        }),
        autoClose: 9000,
        pauseOnHover: true
      });
    } catch (e) {
      console.error("Transfer error", e);

      _reactToastify.toast.update(toastId, {
        type: _reactToastify.toast.TYPE.ERROR,
        isLoading: false,
        closeOnClick: true,
        render: /*#__PURE__*/_react.default.createElement(_TransactionToast.TransactionFailed, {
          title: "Approve failed",
          message: e.message
        })
      });
    }
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    onClick: onOpen,
    isDisabled: !meta.transferable
  }, "Approve"), /*#__PURE__*/_react.default.createElement(_react2.Modal, {
    initialFocusRef: initialRef,
    onClose: onClose,
    isOpen: isOpen,
    isCentered: true,
    size: "xl",
    preserveScrollBarGap: true
  }, /*#__PURE__*/_react.default.createElement(_react2.ModalOverlay, null), /*#__PURE__*/_react.default.createElement(_react2.ModalContent, null, /*#__PURE__*/_react.default.createElement(_react2.ModalHeader, null, "Approve"), /*#__PURE__*/_react.default.createElement(_react2.ModalCloseButton, null), /*#__PURE__*/_react.default.createElement(_react2.ModalBody, null, /*#__PURE__*/_react.default.createElement(_react2.Text, {
    mb: 2
  }, "This will allow a principal to transfer, socket, unsocket and use this NFT. Setting one clears the previous."), /*#__PURE__*/_react.default.createElement(_react2.FormControl, null, /*#__PURE__*/_react.default.createElement(_react2.FormLabel, null, "Principal"), /*#__PURE__*/_react.default.createElement(_react2.Input, {
    ref: initialRef,
    placeholder: "aaaaa-aa..."
  }))), /*#__PURE__*/_react.default.createElement(_react2.ModalFooter, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/_react.default.createElement(_react2.Button, {
    ml: 3,
    onClick: approveOk
  }, "Approve")))));
}

function UnsocketButton(_ref5) {
  let {
    id
  } = _ref5;
  const {
    isOpen,
    onOpen,
    onClose
  } = (0, _react2.useDisclosure)();
  const dispatch = (0, _index.useAnvilDispatch)();

  const initialRef = _react.default.useRef();

  const transferOk = async () => {
    let plug_id = initialRef.current.value;
    onClose();
    let toastId = (0, _reactToastify.toast)("Unplugging...", {
      type: _reactToastify.toast.TYPE.INFO,
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false
    });

    try {
      let {
        transactionId
      } = await dispatch((0, _nft.nft_unsocket)({
        socket_id: id,
        plug_id
      }));

      _reactToastify.toast.update(toastId, {
        type: _reactToastify.toast.TYPE.SUCCESS,
        isLoading: false,
        render: /*#__PURE__*/_react.default.createElement(_TransactionToast.TransactionToast, {
          title: "Unplugging successfull",
          transactionId: transactionId
        }),
        autoClose: 9000,
        pauseOnHover: true
      });
    } catch (e) {
      console.error("Unplugging error", e);

      _reactToastify.toast.update(toastId, {
        type: _reactToastify.toast.TYPE.ERROR,
        isLoading: false,
        closeOnClick: true,
        render: /*#__PURE__*/_react.default.createElement(_TransactionToast.TransactionFailed, {
          title: "Unplugging failed",
          message: e.message
        })
      });
    }
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    onClick: onOpen
  }, "Unplug"), /*#__PURE__*/_react.default.createElement(_react2.Modal, {
    initialFocusRef: initialRef,
    onClose: onClose,
    isOpen: isOpen,
    isCentered: true,
    size: "xl",
    preserveScrollBarGap: true
  }, /*#__PURE__*/_react.default.createElement(_react2.ModalOverlay, null), /*#__PURE__*/_react.default.createElement(_react2.ModalContent, null, /*#__PURE__*/_react.default.createElement(_react2.ModalHeader, null, "Unplug NFT from socket"), /*#__PURE__*/_react.default.createElement(_react2.ModalCloseButton, null), /*#__PURE__*/_react.default.createElement(_react2.ModalBody, null, /*#__PURE__*/_react.default.createElement(_react2.FormControl, null, /*#__PURE__*/_react.default.createElement(_react2.FormLabel, null, "Target plug token identifier"), /*#__PURE__*/_react.default.createElement(_react2.Input, {
    ref: initialRef,
    placeholder: "NFTA29SL..."
  }))), /*#__PURE__*/_react.default.createElement(_react2.ModalFooter, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/_react.default.createElement(_react2.Button, {
    ml: 3,
    onClick: transferOk
  }, "Unplug")))));
}

function SocketButton(_ref6) {
  let {
    id
  } = _ref6;
  const {
    isOpen,
    onOpen,
    onClose
  } = (0, _react2.useDisclosure)();
  const dispatch = (0, _index.useAnvilDispatch)();

  const initialRef = _react.default.useRef();

  const transferOk = async () => {
    let socket_id = initialRef.current.value;
    onClose();
    let toastId = (0, _reactToastify.toast)("Plugging...", {
      type: _reactToastify.toast.TYPE.INFO,
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false
    });

    try {
      let {
        transactionId
      } = await dispatch((0, _nft.nft_plug)({
        plug_id: id,
        socket_id
      }));

      _reactToastify.toast.update(toastId, {
        type: _reactToastify.toast.TYPE.SUCCESS,
        isLoading: false,
        render: /*#__PURE__*/_react.default.createElement(_TransactionToast.TransactionToast, {
          title: "Plugging successfull",
          transactionId: transactionId
        }),
        autoClose: 9000,
        pauseOnHover: true
      });
    } catch (e) {
      console.error("Plugging error", e);

      _reactToastify.toast.update(toastId, {
        type: _reactToastify.toast.TYPE.ERROR,
        isLoading: false,
        closeOnClick: true,
        render: /*#__PURE__*/_react.default.createElement(_TransactionToast.TransactionFailed, {
          title: "Socket failed",
          message: e.message
        })
      });
    }
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    onClick: onOpen
  }, "Plug"), /*#__PURE__*/_react.default.createElement(_react2.Modal, {
    initialFocusRef: initialRef,
    onClose: onClose,
    isOpen: isOpen,
    isCentered: true,
    size: "xl",
    preserveScrollBarGap: true
  }, /*#__PURE__*/_react.default.createElement(_react2.ModalOverlay, null), /*#__PURE__*/_react.default.createElement(_react2.ModalContent, null, /*#__PURE__*/_react.default.createElement(_react2.ModalHeader, null, "Plug NFT into socket"), /*#__PURE__*/_react.default.createElement(_react2.ModalCloseButton, null), /*#__PURE__*/_react.default.createElement(_react2.ModalBody, null, /*#__PURE__*/_react.default.createElement(_react2.FormControl, null, /*#__PURE__*/_react.default.createElement(_react2.FormLabel, null, "Target socket token identifier"), /*#__PURE__*/_react.default.createElement(_react2.Input, {
    ref: initialRef,
    placeholder: "NFTA29SL..."
  }), /*#__PURE__*/_react.default.createElement(_react2.Text, {
    p: 1,
    mt: 1
  }, "Both the plug and the socket need to be owned by the same account"))), /*#__PURE__*/_react.default.createElement(_react2.ModalFooter, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/_react.default.createElement(_react2.Button, {
    ml: 3,
    onClick: transferOk
  }, "Plug")))));
}

const UseButton = _ref7 => {
  let {
    id,
    meta
  } = _ref7;

  const [isOpen, setIsOpen] = _react.default.useState(false);

  const onClose = () => setIsOpen(false);

  const dispatch = (0, _index.useAnvilDispatch)();

  const cancelRef = _react.default.useRef();

  const useOk = async () => {
    onClose();
    let toastId = (0, _reactToastify.toast)("Using...", {
      type: _reactToastify.toast.TYPE.INFO,
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false
    });

    try {
      let useData = {
        cooldown: 2
      };
      let memo = [12, 10, 5, 0, 0, 1, 7];
      let {
        transactionId
      } = await dispatch((0, _nft.nft_use)({
        id,
        use: useData,
        memo
      }));

      _reactToastify.toast.update(toastId, {
        type: _reactToastify.toast.TYPE.SUCCESS,
        isLoading: false,
        render: /*#__PURE__*/_react.default.createElement(_TransactionToast.TransactionToast, {
          title: "Use successfull",
          transactionId: transactionId
        }),
        autoClose: 9000,
        pauseOnHover: true
      });
    } catch (e) {
      let msg = "OnCooldown" in e ? "On cooldown" : JSON.stringify(e);

      _reactToastify.toast.update(toastId, {
        type: _reactToastify.toast.TYPE.ERROR,
        isLoading: false,
        closeOnClick: true,
        render: /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, "Using error."), /*#__PURE__*/_react.default.createElement("div", {
          style: {
            fontSize: "10px"
          }
        }, msg))
      });
    }
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    onClick: () => setIsOpen(true)
  }, "Use"), /*#__PURE__*/_react.default.createElement(_react2.AlertDialog, {
    isOpen: isOpen,
    leastDestructiveRef: cancelRef,
    onClose: onClose,
    preserveScrollBarGap: true
  }, /*#__PURE__*/_react.default.createElement(_react2.AlertDialogOverlay, null, /*#__PURE__*/_react.default.createElement(_react2.AlertDialogContent, null, /*#__PURE__*/_react.default.createElement(_react2.AlertDialogHeader, {
    fontSize: "lg",
    fontWeight: "bold"
  }, "Use NFT"), /*#__PURE__*/_react.default.createElement(_react2.AlertDialogBody, null, "This use is for demo purposes. Once used, the NFT will have 2 min cooldown."), /*#__PURE__*/_react.default.createElement(_react2.AlertDialogFooter, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    ref: cancelRef,
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/_react.default.createElement(_react2.Button, {
    colorScheme: "red",
    onClick: useOk,
    ml: 3
  }, "Use"))))));
};

exports.UseButton = UseButton;

const TransferLinkButton = _ref8 => {
  let {
    id,
    meta
  } = _ref8;

  const [isOpen, setIsOpen] = _react.default.useState(false);

  const [creatingLink, setCreateLink] = _react.default.useState(false);

  const onClose = () => setIsOpen(false);

  const dispatch = (0, _index.useAnvilDispatch)();

  const cancelRef = _react.default.useRef();

  const transferOk = async () => {
    setCreateLink(true);
    let code = await dispatch((0, _nft.nft_transfer_link)({
      id
    }));
    setCreateLink(false);
    setLink("https://nftanvil.com/" + code);
  };

  const [link, setLink] = _react.default.useState(false);

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    onClick: () => setIsOpen(true),
    isDisabled: !meta.transferable
  }, "Gift"), /*#__PURE__*/_react.default.createElement(_react2.AlertDialog, {
    isOpen: isOpen,
    leastDestructiveRef: cancelRef,
    onClose: onClose,
    preserveScrollBarGap: true
  }, /*#__PURE__*/_react.default.createElement(_react2.AlertDialogOverlay, null, /*#__PURE__*/_react.default.createElement(_react2.AlertDialogContent, null, !link ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.AlertDialogHeader, {
    fontSize: "lg",
    fontWeight: "bold"
  }, "Create gift code"), /*#__PURE__*/_react.default.createElement(_react2.AlertDialogBody, null, "Are you sure? Anyone with the code/link will be able to take the NFT from you."), /*#__PURE__*/_react.default.createElement(_react2.AlertDialogFooter, null, !creatingLink ? /*#__PURE__*/_react.default.createElement(_react2.Button, {
    ref: cancelRef,
    onClick: onClose
  }, "Cancel") : null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    isLoading: creatingLink,
    colorScheme: "red",
    onClick: transferOk,
    ml: 3
  }, "Create link"))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.AlertDialogHeader, {
    fontSize: "lg",
    fontWeight: "bold"
  }, "Link to claim NFT"), /*#__PURE__*/_react.default.createElement(_react2.AlertDialogBody, null, link), /*#__PURE__*/_react.default.createElement(_react2.AlertDialogFooter, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    onClick: onClose,
    ml: 3
  }, "Ok")))))));
};

exports.TransferLinkButton = TransferLinkButton;

const BuyButton = _ref9 => {
  let {
    id,
    meta
  } = _ref9;

  const [isOpen, setIsOpen] = _react.default.useState(false);

  const onClose = () => setIsOpen(false);

  const dispatch = (0, _index.useAnvilDispatch)();

  const cancelRef = _react.default.useRef();

  let amount = BigInt(meta.price.amount);

  const buyOk = () => {
    onClose();
    dispatch((0, _nft.nft_purchase)({
      id,
      amount
    }));
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    onClick: async () => {
      setIsOpen(true);
    }
  }, "Buy"), /*#__PURE__*/_react.default.createElement(_react2.AlertDialog, {
    isOpen: isOpen,
    leastDestructiveRef: cancelRef,
    onClose: onClose,
    preserveScrollBarGap: true
  }, /*#__PURE__*/_react.default.createElement(_react2.AlertDialogOverlay, null, /*#__PURE__*/_react.default.createElement(_react2.AlertDialogContent, null, /*#__PURE__*/_react.default.createElement(_react2.AlertDialogHeader, {
    fontSize: "lg",
    fontWeight: "bold"
  }, "Buy NFT"), /*#__PURE__*/_react.default.createElement(_react2.AlertDialogBody, null, "Buy for ", AccountIdentifier.e8sToIcp(amount), " ICP ?", /*#__PURE__*/_react.default.createElement(_react2.Text, {
    fontSize: "12px",
    mt: "2"
  }, "The price includes full recharge"), /*#__PURE__*/_react.default.createElement(_react2.Text, {
    fontSize: "14px",
    fontWeight: "bold",
    mt: "2"
  }, "Please make sure the seller or the author are reputable and known to you. If the NFT has domain verification, make sure you trust its domain. Someone could have minted artwork downloaded from the Internet without the rights to do so. Being displayed here doesn't make it legitimate.")), /*#__PURE__*/_react.default.createElement(_react2.AlertDialogFooter, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    ref: cancelRef,
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/_react.default.createElement(_react2.Button, {
    colorScheme: "red",
    onClick: buyOk,
    ml: 3
  }, "Buy. I understand the risks"))))));
};

exports.BuyButton = BuyButton;

const BurnButton = _ref10 => {
  let {
    id
  } = _ref10;

  const [isOpen, setIsOpen] = _react.default.useState(false);

  const onClose = () => setIsOpen(false);

  const dispatch = (0, _index.useAnvilDispatch)();

  const cancelRef = _react.default.useRef();

  const burnOk = async () => {
    onClose();
    let toastId = (0, _reactToastify.toast)("Burning...", {
      type: _reactToastify.toast.TYPE.INFO,
      position: "bottom-right",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false
    });

    try {
      let {
        transactionId
      } = await dispatch((0, _nft.nft_burn)({
        id
      }));

      _reactToastify.toast.update(toastId, {
        type: _reactToastify.toast.TYPE.SUCCESS,
        isLoading: false,
        render: /*#__PURE__*/_react.default.createElement(_TransactionToast.TransactionToast, {
          title: "Burning successfull",
          transactionId: transactionId
        }),
        autoClose: 9000,
        pauseOnHover: true
      });
    } catch (e) {
      _reactToastify.toast.update(toastId, {
        type: _reactToastify.toast.TYPE.ERROR,
        isLoading: false,
        closeOnClick: true,
        render: /*#__PURE__*/_react.default.createElement(_TransactionToast.TransactionFailed, {
          title: "Burning failed",
          message: e.message
        })
      });
    }
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    onClick: () => setIsOpen(true)
  }, "Burn"), /*#__PURE__*/_react.default.createElement(_react2.AlertDialog, {
    isOpen: isOpen,
    leastDestructiveRef: cancelRef,
    onClose: onClose,
    preserveScrollBarGap: true
  }, /*#__PURE__*/_react.default.createElement(_react2.AlertDialogOverlay, null, /*#__PURE__*/_react.default.createElement(_react2.AlertDialogContent, null, /*#__PURE__*/_react.default.createElement(_react2.AlertDialogHeader, {
    fontSize: "lg",
    fontWeight: "bold"
  }, "Burn NFT"), /*#__PURE__*/_react.default.createElement(_react2.AlertDialogBody, null, "Are you sure? This will destroy the NFT completely. You can't undo this action afterwards."), /*#__PURE__*/_react.default.createElement(_react2.AlertDialogFooter, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    ref: cancelRef,
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/_react.default.createElement(_react2.Button, {
    colorScheme: "red",
    onClick: burnOk,
    ml: 3
  }, "Burn"))))));
};

exports.BurnButton = BurnButton;

const RechargeButton = _ref11 => {
  let {
    id,
    meta
  } = _ref11;

  const [isOpen, setIsOpen] = _react.default.useState(false);

  const [rechargeCost, setRechargeCost] = _react.default.useState(0);

  const onClose = () => setIsOpen(false);

  const dispatch = (0, _index.useAnvilDispatch)();

  const cancelRef = _react.default.useRef();

  (0, _react.useEffect)(() => {
    dispatch((0, _nft.nft_recharge_quote)({
      id
    })).then(re => {
      setRechargeCost(re);
    });
  }, [id, meta, dispatch]);

  const rechargeOk = async () => {
    onClose();
    dispatch((0, _nft.nft_recharge)({
      id,
      amount: rechargeCost
    }));
  };

  if (!rechargeCost) return null;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    onClick: () => setIsOpen(true)
  }, /*#__PURE__*/_react.default.createElement(_react2.Text, {
    mr: "2"
  }, "Recharge for "), /*#__PURE__*/_react.default.createElement(_Code.ICP, null, rechargeCost)), /*#__PURE__*/_react.default.createElement(_react2.AlertDialog, {
    isOpen: isOpen,
    leastDestructiveRef: cancelRef,
    onClose: onClose,
    preserveScrollBarGap: true
  }, /*#__PURE__*/_react.default.createElement(_react2.AlertDialogOverlay, null, /*#__PURE__*/_react.default.createElement(_react2.AlertDialogContent, null, /*#__PURE__*/_react.default.createElement(_react2.AlertDialogHeader, {
    fontSize: "lg",
    fontWeight: "bold"
  }, "Recharge NFT"), /*#__PURE__*/_react.default.createElement(_react2.AlertDialogBody, null, "Are you sure? This will take ", /*#__PURE__*/_react.default.createElement(_Code.ICP, null, rechargeCost), " from your balance and put it in the NFT"), /*#__PURE__*/_react.default.createElement(_react2.AlertDialogFooter, null, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    ref: cancelRef,
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/_react.default.createElement(_react2.Button, {
    colorScheme: "blue",
    onClick: rechargeOk,
    ml: 3
  }, "Recharge"))))));
};

exports.RechargeButton = RechargeButton;

const NFTPopover = _ref12 => {
  let {
    meta
  } = _ref12;
  return /*#__PURE__*/_react.default.createElement(_react2.Stack, null, /*#__PURE__*/_react.default.createElement(_react2.Center, null, /*#__PURE__*/_react.default.createElement(NFTInfo, {
    meta: meta
  })));
};

exports.NFTPopover = NFTPopover;

const NFTLarge = _ref13 => {
  var _meta$thumb, _meta$thumb$ipfs, _meta$thumb2, _meta$thumb2$internal, _meta$thumb3, _meta$thumb4;

  let {
    id
  } = _ref13;
  const meta = (0, _index.useAnvilSelector)(state => state.nft[id]);
  const mode = (0, _react2.useColorModeValue)("light", "dark");
  const dispatch = (0, _index.useAnvilDispatch)();
  (0, _react.useEffect)(() => {
    dispatch((0, _nft.nft_fetch)(id));
  }, [id, dispatch]);
  if (!meta) return null;
  return /*#__PURE__*/_react.default.createElement(ThumbLarge, {
    mode: mode
  }, (_meta$thumb = meta.thumb) !== null && _meta$thumb !== void 0 && (_meta$thumb$ipfs = _meta$thumb.ipfs) !== null && _meta$thumb$ipfs !== void 0 && _meta$thumb$ipfs.url ? /*#__PURE__*/_react.default.createElement("img", {
    alt: "",
    className: "custom",
    src: meta.thumb.ipfs.url
  }) : (_meta$thumb2 = meta.thumb) !== null && _meta$thumb2 !== void 0 && (_meta$thumb2$internal = _meta$thumb2.internal) !== null && _meta$thumb2$internal !== void 0 && _meta$thumb2$internal.url ? /*#__PURE__*/_react.default.createElement("img", {
    alt: "",
    className: "custom",
    src: meta.thumb.internal.url
  }) : (_meta$thumb3 = meta.thumb) !== null && _meta$thumb3 !== void 0 && _meta$thumb3.external ? /*#__PURE__*/_react.default.createElement("img", {
    alt: "",
    className: "custom",
    src: (_meta$thumb4 = meta.thumb) === null || _meta$thumb4 === void 0 ? void 0 : _meta$thumb4.external
  }) : "", /*#__PURE__*/_react.default.createElement("div", {
    className: "info"
  }, meta.domain ? meta.domain.indexOf("twitter.com/") !== -1 ? /*#__PURE__*/_react.default.createElement(MetaDomainTwitter, {
    key: "domain",
    meta: meta,
    showLink: false
  }) : /*#__PURE__*/_react.default.createElement(MetaDomain, {
    key: "domain",
    meta: meta,
    showLink: false
  }) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "author"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "label"
  }, "AUTHOR"), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Code.ACC, {
    short: true
  }, meta.author))), meta.price.amount && meta.price.amount !== "0" ? /*#__PURE__*/_react.default.createElement("div", {
    className: "price"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "label"
  }, "PRICE"), /*#__PURE__*/_react.default.createElement(_Code.ICP, {
    digits: 2
  }, meta.price.amount)) : null));
};

exports.NFTLarge = NFTLarge;

const NFT = _ref14 => {
  var _meta$thumb5, _meta$thumb5$ipfs, _meta$thumb6, _meta$thumb6$internal, _meta$thumb7;

  let {
    id,
    thumbSize
  } = _ref14;
  const meta = (0, _index.useAnvilSelector)(state => state.nft[id]);
  const dispatch = (0, _index.useAnvilDispatch)();
  const [popoverOpen, setPopover] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    dispatch((0, _nft.nft_fetch)(id));
  }, [id, dispatch]);
  return /*#__PURE__*/_react.default.createElement(Thumb, {
    style: {
      zIndex: popoverOpen ? 10 : 0
    },
    onMouseOver: () => {
      setPopover(true);
    },
    onMouseOut: () => {
      setPopover(false);
    }
  }, meta !== null && meta !== void 0 && (_meta$thumb5 = meta.thumb) !== null && _meta$thumb5 !== void 0 && (_meta$thumb5$ipfs = _meta$thumb5.ipfs) !== null && _meta$thumb5$ipfs !== void 0 && _meta$thumb5$ipfs.url ? /*#__PURE__*/_react.default.createElement("img", {
    alt: "",
    className: "custom",
    src: meta.thumb.ipfs.url
  }) : meta !== null && meta !== void 0 && (_meta$thumb6 = meta.thumb) !== null && _meta$thumb6 !== void 0 && (_meta$thumb6$internal = _meta$thumb6.internal) !== null && _meta$thumb6$internal !== void 0 && _meta$thumb6$internal.url ? /*#__PURE__*/_react.default.createElement("img", {
    alt: "",
    className: "custom",
    src: meta.thumb.internal.url
  }) : meta !== null && meta !== void 0 && (_meta$thumb7 = meta.thumb) !== null && _meta$thumb7 !== void 0 && _meta$thumb7.external ? /*#__PURE__*/_react.default.createElement("img", {
    alt: "",
    className: "custom",
    src: meta.thumb.external
  }) : "", /*#__PURE__*/_react.default.createElement("div", {
    className: "border"
  }), popoverOpen ? /*#__PURE__*/_react.default.createElement(_react2.Box, {
    sx: {
      pointerEvents: "none",
      position: "absolute",
      top: "56px",
      left: "56px",
      width: "400px"
    }
  }, /*#__PURE__*/_react.default.createElement(NFTPopover, {
    meta: meta
  })) : null);
};

exports.NFT = NFT;

const NFTClaim = p => {
  const code = p.match.params.code;
  const dispatch = (0, _index.useAnvilDispatch)();
  (0, _react.useEffect)(() => {
    dispatch((0, _nft.nft_enter_code)(code));
  }, [code, dispatch]);
  return null;
};

exports.NFTClaim = NFTClaim;

const NFTPage = p => {
  var _meta$bearer;

  const id = p.match.params.id;
  const code = p.match.params.code;
  const address = (0, _index.useAnvilSelector)(state => state.user.address);
  const meta = (0, _index.useAnvilSelector)(state => state.nft[id]);
  const pro = (0, _index.useAnvilSelector)(state => state.user.pro);
  const [claimed, setClaimed] = (0, _react.useState)(false);
  const [error, setError] = (0, _react.useState)(false);
  const [claiming, setClaiming] = (0, _react.useState)(false);
  const dispatch = (0, _index.useAnvilDispatch)();
  (0, _react.useEffect)(() => {
    dispatch((0, _nft.nft_fetch)(id));
  }, [id, dispatch]);

  const onClaim = async () => {
    setClaiming(true);
    setError(false);
    let resp = await dispatch((0, _nft.nft_claim_link)({
      code
    }));
    setClaiming(false);

    if (resp.ok !== undefined) {
      setClaimed(true);
    } else {
      setError(true);
    }
  };

  if (!meta) return null;
  return /*#__PURE__*/_react.default.createElement(_react2.Stack, {
    ml: "10px",
    mr: "10px",
    mt: "4vh"
  }, /*#__PURE__*/_react.default.createElement(_react2.Center, null, /*#__PURE__*/_react.default.createElement(NFTContent, {
    meta: meta
  })), /*#__PURE__*/_react.default.createElement(_react2.Center, null, /*#__PURE__*/_react.default.createElement(_react2.Stack, null, /*#__PURE__*/_react.default.createElement(NFTThumb, {
    meta: meta
  }), /*#__PURE__*/_react.default.createElement(NFTInfo, {
    id: id,
    meta: meta
  }), pro ? /*#__PURE__*/_react.default.createElement(NFTProInfo, {
    id: id,
    meta: meta
  }) : null)), /*#__PURE__*/_react.default.createElement(_react2.Center, null, /*#__PURE__*/_react.default.createElement(NFTMenu, {
    nobuy: !claimed && code,
    owner: address && address.toUpperCase() === (meta === null || meta === void 0 ? void 0 : (_meta$bearer = meta.bearer) === null || _meta$bearer === void 0 ? void 0 : _meta$bearer.toUpperCase()),
    id: id,
    meta: meta
  })), claimed ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Confetti.default, null), /*#__PURE__*/_react.default.createElement(_react2.Alert, {
    status: "success"
  }, /*#__PURE__*/_react.default.createElement(_react2.AlertIcon, null), /*#__PURE__*/_react.default.createElement(_react2.AlertTitle, {
    mr: 2
  }, "Claiming sucess!"), /*#__PURE__*/_react.default.createElement(_react2.AlertDescription, null, "The NFT is now yours. This link can't be used again."))) : null, !claimed && code ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_react2.Center, null, /*#__PURE__*/_react.default.createElement(_LoginRequired.LoginRequired, {
    label: "Authenticate to claim"
  }, /*#__PURE__*/_react.default.createElement(_react2.Button, {
    isLoading: claiming,
    loadingText: "Claiming",
    onClick: onClaim,
    colorScheme: "teal",
    size: "lg"
  }, "Claim NFT"))), error ? /*#__PURE__*/_react.default.createElement(_react2.Alert, {
    status: "error"
  }, /*#__PURE__*/_react.default.createElement(_react2.AlertIcon, null), /*#__PURE__*/_react.default.createElement(_react2.AlertTitle, {
    mr: 2
  }, "Claiming failed!"), /*#__PURE__*/_react.default.createElement(_react2.AlertDescription, null, "Perhaps someone else claimed this code before you or it's not valid")) : null) : null, meta.history ? /*#__PURE__*/_react.default.createElement(_History.NftHistory, {
    transactions: meta.history,
    showThumb: false
  }) : null);
};

exports.NFTPage = NFTPage;

const NFTContent = p => {
  var _p$meta, _p$meta$content, _p$meta2, _p$meta2$content, _p$meta3, _p$meta3$content;

  const dispatch = (0, _index.useAnvilDispatch)(); //if (p.meta?.content?.external) return null;

  const c = ((_p$meta = p.meta) === null || _p$meta === void 0 ? void 0 : (_p$meta$content = _p$meta.content) === null || _p$meta$content === void 0 ? void 0 : _p$meta$content.internal) || ((_p$meta2 = p.meta) === null || _p$meta2 === void 0 ? void 0 : (_p$meta2$content = _p$meta2.content) === null || _p$meta2$content === void 0 ? void 0 : _p$meta2$content.ipfs) || ((_p$meta3 = p.meta) === null || _p$meta3 === void 0 ? void 0 : (_p$meta3$content = _p$meta3.content) === null || _p$meta3$content === void 0 ? void 0 : _p$meta3$content.external);
  if (!c) return null;
  const ctype = c.contentType ? c.contentType.indexOf("image/") !== -1 ? "image" : c.contentType.indexOf("video/") !== -1 ? "video" : "unknown" : "image";
  if (ctype === "unknown") return null;
  const url = c.url || c;
  return /*#__PURE__*/_react.default.createElement(ContentBox, null, ctype === "image" && url ? /*#__PURE__*/_react.default.createElement("img", {
    crossOrigin: "true",
    src: url,
    alt: "",
    width: "100%"
  }) : null, ctype === "video" && url ? /*#__PURE__*/_react.default.createElement("video", {
    controls: true,
    loop: true,
    muted: true,
    autoPlay: true
  }, /*#__PURE__*/_react.default.createElement("source", {
    src: url,
    type: c.contentType
  })) : null);
};

exports.NFTContent = NFTContent;

const NFTPreview = p => {
  return /*#__PURE__*/_react.default.createElement(_react2.Stack, {
    spacing: "5"
  }, /*#__PURE__*/_react.default.createElement(NFTContent, {
    meta: p
  }), /*#__PURE__*/_react.default.createElement(NFTInfo, {
    meta: p
  }), /*#__PURE__*/_react.default.createElement(NFTThumb, {
    meta: p
  }), /*#__PURE__*/_react.default.createElement(NFTThumbLarge, {
    meta: p
  }));
};

exports.NFTPreview = NFTPreview;

const NFTThumb = p => {
  var _p$meta4, _p$meta4$thumb, _p$meta5, _p$meta5$thumb, _p$meta6, _p$meta6$thumb, _p$meta7, _p$meta7$thumb;

  if ((_p$meta4 = p.meta) !== null && _p$meta4 !== void 0 && (_p$meta4$thumb = _p$meta4.thumb) !== null && _p$meta4$thumb !== void 0 && _p$meta4$thumb.external) return null;
  const c = ((_p$meta5 = p.meta) === null || _p$meta5 === void 0 ? void 0 : (_p$meta5$thumb = _p$meta5.thumb) === null || _p$meta5$thumb === void 0 ? void 0 : _p$meta5$thumb.internal) || ((_p$meta6 = p.meta) === null || _p$meta6 === void 0 ? void 0 : (_p$meta6$thumb = _p$meta6.thumb) === null || _p$meta6$thumb === void 0 ? void 0 : _p$meta6$thumb.ipfs) || ((_p$meta7 = p.meta) === null || _p$meta7 === void 0 ? void 0 : (_p$meta7$thumb = _p$meta7.thumb) === null || _p$meta7$thumb === void 0 ? void 0 : _p$meta7$thumb.external);
  if (!c) return null;
  return /*#__PURE__*/_react.default.createElement(Thumb, p, c.url ? /*#__PURE__*/_react.default.createElement("img", {
    className: "custom",
    alt: "",
    src: c.url
  }) : "", /*#__PURE__*/_react.default.createElement("div", {
    className: "border"
  }));
};

exports.NFTThumb = NFTThumb;

const NFTThumbLarge = p => {
  var _p$meta8, _p$meta8$thumb, _p$meta9, _p$meta9$thumb, _p$meta10, _p$meta10$thumb, _p$meta11, _p$meta11$thumb;

  const mode = (0, _react2.useColorModeValue)("light", "dark");
  if ((_p$meta8 = p.meta) !== null && _p$meta8 !== void 0 && (_p$meta8$thumb = _p$meta8.thumb) !== null && _p$meta8$thumb !== void 0 && _p$meta8$thumb.external) return null;
  const c = ((_p$meta9 = p.meta) === null || _p$meta9 === void 0 ? void 0 : (_p$meta9$thumb = _p$meta9.thumb) === null || _p$meta9$thumb === void 0 ? void 0 : _p$meta9$thumb.internal) || ((_p$meta10 = p.meta) === null || _p$meta10 === void 0 ? void 0 : (_p$meta10$thumb = _p$meta10.thumb) === null || _p$meta10$thumb === void 0 ? void 0 : _p$meta10$thumb.ipfs) || ((_p$meta11 = p.meta) === null || _p$meta11 === void 0 ? void 0 : (_p$meta11$thumb = _p$meta11.thumb) === null || _p$meta11$thumb === void 0 ? void 0 : _p$meta11$thumb.external);
  if (!c) return null;
  return /*#__PURE__*/_react.default.createElement(ThumbLarge, _extends({}, p, {
    style: {
      marginLeft: "6px"
    },
    mode: mode
  }), c.url ? /*#__PURE__*/_react.default.createElement("img", {
    className: "custom",
    alt: "",
    src: c.url
  }) : "", /*#__PURE__*/_react.default.createElement("div", {
    className: "info"
  }, p.meta.domain ? /*#__PURE__*/_react.default.createElement("div", {
    className: "collection"
  }, p.meta.domain ? p.meta.domain.indexOf("twitter.com/") !== -1 ? /*#__PURE__*/_react.default.createElement(MetaDomainTwitter, {
    key: "domain",
    meta: p.meta,
    showLink: false
  }) : /*#__PURE__*/_react.default.createElement(MetaDomain, {
    key: "domain",
    meta: p.meta,
    showLink: false
  }) : null) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "author"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "label"
  }, "AUTHOR"), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Code.ACC, {
    short: true
  }, p.meta.author))), p.meta.price.amount && p.meta.price.amount !== "0" ? /*#__PURE__*/_react.default.createElement("div", {
    className: "price"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "label"
  }, "PRICE"), /*#__PURE__*/_react.default.createElement(_Code.ICP, {
    digits: 2
  }, p.meta.price.amount)) : null));
};

exports.NFTThumbLarge = NFTThumbLarge;

const MetaDomainTwitter = _ref15 => {
  let {
    meta,
    showLink
  } = _ref15;
  let url = new URL("https://" + meta.domain);
  let surl = url.href.replace(/^https?:\/\//, "");
  const dispatch = (0, _index.useAnvilDispatch)();
  const domainInfo = (0, _index.useAnvilSelector)(state => state.inventory[surl + "_domain"]);
  const isLoading = domainInfo === -1 ? true : false;
  let verified = false;

  try {
    if (!isLoading && domainInfo === meta.author) verified = true;
  } catch (e) {
    console.log(e);
  }

  (0, _react.useEffect)(() => {
    dispatch((0, _inventory.verify_domainTwitter)(surl));
  }, [surl, dispatch]);
  let urlSafe = verified ? "https://" + surl : null;
  const [a, b, c, d] = meta.domain.split("/");

  let content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, a, "/", b, " ", isLoading ? /*#__PURE__*/_react.default.createElement(_react2.Spinner, {
    size: "xs"
  }) : verified ? /*#__PURE__*/_react.default.createElement(_icons.VerifiedIcon, {
    w: "16px",
    h: "16px"
  }) : null);

  return /*#__PURE__*/_react.default.createElement(_react2.Box, {
    color: verified ? "green.300" : isLoading ? null : "red.300",
    as: verified ? null : isLoading ? null : "s"
  }, showLink && urlSafe ? /*#__PURE__*/_react.default.createElement("a", {
    href: urlSafe,
    rel: "noreferrer",
    target: "_blank"
  }, content) : content);
};

const MetaDomain = _ref16 => {
  let {
    meta,
    showLink
  } = _ref16;
  let url = new URL("https://" + meta.domain);
  const dispatch = (0, _index.useAnvilDispatch)();
  const domainInfo = (0, _index.useAnvilSelector)(state => state.inventory[url.hostname + "_domain"]);
  const isLoading = domainInfo === -1 ? true : false;
  let verified = false;

  try {
    if (!isLoading && typeof domainInfo === "object" && domainInfo[url.pathname].indexOf(meta.author) !== -1) verified = true;
  } catch (e) {
    console.log(e);
  }

  (0, _react.useEffect)(() => {
    dispatch((0, _inventory.verify_domain)(url.hostname));
  }, [url.hostname, dispatch]);
  let urlSafe = verified ? "https://" + url.hostname + url.pathname : null;

  let content = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, meta.domain, " ", isLoading ? /*#__PURE__*/_react.default.createElement(_react2.Spinner, {
    size: "xs"
  }) : verified ? /*#__PURE__*/_react.default.createElement(_icons.VerifiedIcon, {
    w: "16px",
    h: "16px"
  }) : null);

  return /*#__PURE__*/_react.default.createElement(_react2.Box, {
    color: verified ? "green.300" : isLoading ? null : "red.300",
    as: verified ? null : isLoading ? null : "s"
  }, showLink && urlSafe ? /*#__PURE__*/_react.default.createElement("a", {
    href: urlSafe,
    rel: "noreferrer",
    target: "_blank"
  }, content) : content);
};

const capitalize = x => x.charAt(0).toUpperCase() + x.slice(1);

const NFTInfo = _ref17 => {
  var _meta$use, _meta$use$consumable, _meta$use2, _meta$use2$cooldown, _meta$hold, _meta$hold$external, _meta$content, _meta$content$thumb;

  let {
    id,
    meta
  } = _ref17;
  const mode = (0, _react2.useColorModeValue)("light", "dark");
  const bg = (0, _react2.useColorModeValue)("gray.100", "gray.700");
  const textColor = (0, _react2.useColorModeValue)("gray.900", "gray.100");
  const isDark = mode === "dark";
  if (!meta || !("quality" in meta)) return null;
  const qcolor = _items.itemQuality[mode][meta.quality].color;
  let nowMinutes = Math.floor(Date.now() / 1000 / 60);
  let things = [meta.name ? /*#__PURE__*/_react.default.createElement(_react2.Text, {
    key: "name",
    color: qcolor,
    fontSize: "16px"
  }, capitalize(meta.name)) : null, meta.tags && meta.tags.length ? /*#__PURE__*/_react.default.createElement(_react2.Wrap, {
    key: "tags",
    spacing: 1
  }, meta.tags.map((a, idx) => /*#__PURE__*/_react.default.createElement(_react2.Tag, {
    key: idx,
    size: "sm",
    bg: isDark ? "gray.600" : "gray.300"
  }, a))) : null, meta.domain ? meta.domain.indexOf("twitter.com/") !== -1 ? /*#__PURE__*/_react.default.createElement(MetaDomainTwitter, {
    key: "domain",
    meta: meta,
    showLink: true
  }) : /*#__PURE__*/_react.default.createElement(MetaDomain, {
    key: "domain",
    meta: meta,
    showLink: true
  }) : null, "bindsForever" in meta.transfer ? /*#__PURE__*/_react.default.createElement(_react2.Text, {
    key: "bindsForever",
    fontSize: "14px"
  }, "Binds on transfer") : null, "bindsDuration" in meta.transfer ? /*#__PURE__*/_react.default.createElement(_react2.Text, {
    key: "bindsDuration",
    fontSize: "14px"
  }, "Binds on transfer for", " ", _moment.default.duration(meta.transfer.bindsDuration, "minutes").humanize()) : null, meta.boundUntil > nowMinutes ? /*#__PURE__*/_react.default.createElement(_react2.Text, {
    key: "boundUntil",
    fontSize: "14px",
    color: isDark ? "green.400" : "green.800",
    as: "i"
  }, "bound for " + _moment.default.duration(meta.boundUntil - nowMinutes, "minutes").humanize()) : null, meta !== null && meta !== void 0 && (_meta$use = meta.use) !== null && _meta$use !== void 0 && (_meta$use$consumable = _meta$use.consumable) !== null && _meta$use$consumable !== void 0 && _meta$use$consumable.desc ? /*#__PURE__*/_react.default.createElement(_react2.Text, {
    key: "consumable",
    fontSize: "14px",
    color: isDark ? "green.400" : "green.800",
    as: "i"
  }, "Use: ", capitalize(meta.use.consumable.desc), " (Consumed in the process)") : null, meta.cooldownUntil > nowMinutes ? /*#__PURE__*/_react.default.createElement(_react2.Text, {
    key: "cooldownUntil",
    fontSize: "14px",
    color: isDark ? "green.400" : "green.800"
  }, _moment.default.duration(meta.cooldownUntil - nowMinutes, "minutes").humanize() + " cooldown left") : null, meta !== null && meta !== void 0 && (_meta$use2 = meta.use) !== null && _meta$use2 !== void 0 && (_meta$use2$cooldown = _meta$use2.cooldown) !== null && _meta$use2$cooldown !== void 0 && _meta$use2$cooldown.desc ? /*#__PURE__*/_react.default.createElement(_react2.Text, {
    key: "cooldownDesc",
    fontSize: "14px",
    color: isDark ? "green.400" : "green.800"
  }, "Use: ", capitalize(meta.use.cooldown.desc), " (", _moment.default.duration(meta.use.cooldown.duration, "minutes").humanize(), " ", "cooldown)") : null, meta !== null && meta !== void 0 && meta.secret ? /*#__PURE__*/_react.default.createElement(_react2.Text, {
    key: "secret",
    fontSize: "14px",
    color: isDark ? "purple.400" : "purple.800"
  }, "Secret") : null, (_meta$hold = meta.hold) !== null && _meta$hold !== void 0 && (_meta$hold$external = _meta$hold.external) !== null && _meta$hold$external !== void 0 && _meta$hold$external.desc ? /*#__PURE__*/_react.default.createElement(_react2.Text, {
    key: "hold",
    fontSize: "14px",
    color: isDark ? "green.400" : "green.800"
  }, "Hold: ", capitalize(meta.hold.external.desc)) : null, meta.attributes && meta.attributes.length ? meta.attributes.map((a, idx) => /*#__PURE__*/_react.default.createElement(_react2.Text, {
    key: "attr" + idx,
    fontSize: "14px"
  }, a[1] >= 0 ? "+" : "", a[1], " ", capitalize(a[0]))) : null, meta.lore ? /*#__PURE__*/_react.default.createElement(_react2.Text, {
    key: "lore",
    fontSize: "14px",
    pt: "14px",
    color: isDark ? "yellow" : "yellow.600"
  }, "\"", capitalize(meta.lore), "\"") : null, meta.rechargeable && meta.ttl && meta.ttl > 0 ? /*#__PURE__*/_react.default.createElement(_react2.Text, {
    key: "ttl",
    fontSize: "14px",
    pt: "14px",
    color: isDark ? "gray.400" : "gray.800"
  }, "Recharge in ", _moment.default.duration(meta.ttl, "minutes").humanize()) : null, !meta.rechargeable && meta.ttl && meta.ttl > 0 ? /*#__PURE__*/_react.default.createElement(_react2.Text, {
    key: "ttl",
    fontSize: "14px",
    pt: "14px",
    color: isDark ? "gray.400" : "gray.800"
  }, "Expires in ", _moment.default.duration(meta.ttl, "minutes").humanize()) : null, meta.sockets && meta.sockets.length ? /*#__PURE__*/_react.default.createElement(_react2.Wrap, {
    key: "sockets",
    spacing: 0
  }, meta.sockets.map((tid, idx) => /*#__PURE__*/_react.default.createElement(NFT, {
    id: tid,
    key: tid
  }))) : null, meta.price.amount && meta.price.amount !== "0" ? /*#__PURE__*/_react.default.createElement(_react2.Text, {
    key: "icpPrice"
  }, /*#__PURE__*/_react.default.createElement(_Code.ICP, null, meta.price.amount)) : null, id ? /*#__PURE__*/_react.default.createElement(_react2.Flex, {
    key: "footer",
    pt: "1",
    pr: "1",
    sx: {
      lineHeight: "8px;"
    },
    pb: "2px"
  }, /*#__PURE__*/_react.default.createElement(NFTBattery, {
    meta: meta
  }), /*#__PURE__*/_react.default.createElement(_react2.Spacer, null), /*#__PURE__*/_react.default.createElement(_react2.Text, {
    fontSize: "10px"
  }, /*#__PURE__*/_react.default.createElement(_Code.NFTA, null, id))) : null].filter(Boolean);
  if (!things.length) return null;
  return /*#__PURE__*/_react.default.createElement(_react2.Box, {
    bg: bg,
    color: textColor,
    borderRadius: "md",
    w: 350,
    p: 2,
    sx: {
      position: "relative"
    }
  }, (_meta$content = meta.content) !== null && _meta$content !== void 0 && (_meta$content$thumb = _meta$content.thumb) !== null && _meta$content$thumb !== void 0 && _meta$content$thumb.url ? /*#__PURE__*/_react.default.createElement("img", {
    src: meta.content.thumb.url
  }) : "", /*#__PURE__*/_react.default.createElement(_react2.Stack, {
    spacing: 0
  }, things));
};

exports.NFTInfo = NFTInfo;
const NFTBatFull = _styled.default.span`
  display: inline-block;
  background-color: ${props => props.color};
  width: 4px;
  margin-left: 1px;
  border-radius: 1px;
  height: 7px;
`;

const NFTBattery = _ref18 => {
  let {
    meta
  } = _ref18;
  const icpCycles = Number((0, _index.useAnvilSelector)(state => state.user.oracle.icpCycles));
  const avg_msg_cost_pwr = Number(_pricing.AVG_MESSAGE_COST) / icpCycles; //TODO: calculate it from oracle data

  let ttl = meta.ttl > 0 ? meta.ttl : Number(_pricing.FULLY_CHARGED_MINUTES);
  let msg_full = (ttl / 60 / 24 + 100) * avg_msg_cost_pwr;
  let perc = meta.pwr[0] / msg_full;
  let avg_num_ops_left = Math.round(meta.pwr[0] / avg_msg_cost_pwr);
  let color = `rgb(${Math.floor(125 - 125 * perc)}, ${Math.floor(200 * perc)}, 255)`;
  let colorEmpty = `rgb(${Math.floor(255 - 255 * perc)}, 70, 70)`;
  return /*#__PURE__*/_react.default.createElement(_react2.Tooltip, {
    hasArrow: true,
    placement: "top-start",
    label: /*#__PURE__*/_react.default.createElement(_react2.Box, null, /*#__PURE__*/_react.default.createElement(_react2.Text, {
      fontWeight: "bold",
      fontSize: "15px",
      mb: "1",
      mt: "1"
    }, avg_num_ops_left + " operations left"), /*#__PURE__*/_react.default.createElement(_react2.Text, null, "Indicator displaying PWR stored inside the NFT. Refills automatically on marketplace sale."))
  }, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(NFTBatFull, {
    color: perc >= 0.15 ? color : colorEmpty
  }), /*#__PURE__*/_react.default.createElement(NFTBatFull, {
    color: perc >= 0.5 ? color : colorEmpty
  }), /*#__PURE__*/_react.default.createElement(NFTBatFull, {
    color: perc >= 0.75 ? color : colorEmpty
  }), /*#__PURE__*/_react.default.createElement(NFTBatFull, {
    color: perc >= 0.9 ? color : colorEmpty
  })));
};

exports.NFTBattery = NFTBattery;

const NFTProInfo = _ref19 => {
  var _meta$content2, _meta$content2$thumb;

  let {
    id,
    meta
  } = _ref19;
  const bg = (0, _react2.useColorModeValue)("gray.200", "gray.900");
  if (!meta || !("quality" in meta)) return null;
  let nowMinutes = Math.floor(Date.now() / 1000 / 60); //if (!meta.name) return null;

  return /*#__PURE__*/_react.default.createElement(_react2.Box, {
    bg: bg,
    borderRadius: "md",
    w: 350,
    p: 2,
    sx: {
      wordBreak: "break-all",
      textTransform: "uppercase"
    }
  }, (_meta$content2 = meta.content) !== null && _meta$content2 !== void 0 && (_meta$content2$thumb = _meta$content2.thumb) !== null && _meta$content2$thumb !== void 0 && _meta$content2$thumb.url ? /*#__PURE__*/_react.default.createElement("img", {
    src: meta.content.thumb.url
  }) : "", /*#__PURE__*/_react.default.createElement(_react2.Stack, {
    spacing: 0
  }, meta.pwr ? /*#__PURE__*/_react.default.createElement(_react2.Text, {
    fontSize: "9px"
  }, "Ops: ", /*#__PURE__*/_react.default.createElement(_Code.ICP, null, meta.pwr[0]), " Storage: ", /*#__PURE__*/_react.default.createElement(_Code.ICP, null, meta.pwr[1])) : null, meta.bearer ? /*#__PURE__*/_react.default.createElement(_react2.Text, {
    fontSize: "9px"
  }, "Bearer: ", /*#__PURE__*/_react.default.createElement(_Code.ACC, {
    short: true
  }, meta.bearer)) : null, meta.author ? /*#__PURE__*/_react.default.createElement(_react2.Text, {
    fontSize: "9px",
    sx: {}
  }, "Author: ", /*#__PURE__*/_react.default.createElement(_Code.ACC, {
    short: true
  }, meta.author)) : null, meta.authorShare ? /*#__PURE__*/_react.default.createElement(_react2.Text, {
    fontSize: "9px"
  }, "Author's share: ", /*#__PURE__*/_react.default.createElement("b", null, (meta.authorShare / 100).toFixed(2), "%")) : null, meta.created ? /*#__PURE__*/_react.default.createElement(_react2.Text, {
    fontSize: "9px"
  }, "Minted: ", (0, _moment.default)(meta.created * 60 * 1000).format("LLLL")) : null, meta.entropy ? /*#__PURE__*/_react.default.createElement(_react2.Text, {
    fontSize: "9px"
  }, "Entropy: ", /*#__PURE__*/_react.default.createElement(_Code.HASH, null, (0, _data.toHexString)(meta.entropy))) : null));
};

exports.NFTProInfo = NFTProInfo;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL05GVC5qcyJdLCJuYW1lcyI6WyJDb250ZW50Qm94Iiwic3R5bGVkIiwiZGl2IiwiVGh1bWIiLCJ0aHVtYl9iZyIsInRodW1iX292ZXIiLCJUaHVtYkxhcmdlIiwicHJvcHMiLCJtb2RlIiwiTkZUTWVudSIsImlkIiwibWV0YSIsIm93bmVyIiwibm9idXkiLCJwcm8iLCJzdGF0ZSIsInVzZXIiLCJ0cmFuc2ZlcmFibGUiLCJwcmljZSIsImFtb3VudCIsIlNldFByaWNlQnV0dG9uIiwiaXNPcGVuIiwib25PcGVuIiwib25DbG9zZSIsImRpc3BhdGNoIiwiYWRkcmVzcyIsImluaXRpYWxSZWYiLCJSZWFjdCIsInVzZVJlZiIsInJlbW92ZVNhbGUiLCJ0b2FzdElkIiwidHlwZSIsInRvYXN0IiwiVFlQRSIsIklORk8iLCJwb3NpdGlvbiIsImF1dG9DbG9zZSIsImhpZGVQcm9ncmVzc0JhciIsImNsb3NlT25DbGljayIsInBhdXNlT25Ib3ZlciIsImRyYWdnYWJsZSIsIm1hcmtldHBsYWNlIiwiQWNjb3VudElkZW50aWZpZXIiLCJUZXh0VG9BcnJheSIsIk1BUktFVFBMQUNFX0FJRCIsInNoYXJlIiwiTUFSS0VUUExBQ0VfU0hBUkUiLCJ1cGRhdGUiLCJTVUNDRVNTIiwiaXNMb2FkaW5nIiwicmVuZGVyIiwiZSIsImNvbnNvbGUiLCJlcnJvciIsIkVSUk9SIiwibWVzc2FnZSIsInNldFByaWNlT2siLCJwcmljZXZhbCIsInBhcnNlRmxvYXQiLCJjdXJyZW50IiwidmFsdWUiLCJpY3BUb0U4cyIsIkFOVklMX1NIQVJFIiwiYXV0aG9yU2hhcmUiLCJsb2ciLCJ0b0ZpeGVkIiwiVHJhbnNmZXJCdXR0b24iLCJhbGVydE9wZW4iLCJzZXRBbGVydE9wZW4iLCJ1c2VTdGF0ZSIsImNvbmZpcm1PayIsInRvQWRkcmVzcyIsInRvVXBwZXJDYXNlIiwidHJhbnNmZXJPayIsInRvTG93ZXJDYXNlIiwiaW5kZXhPZiIsIkFwcHJvdmVCdXR0b24iLCJhcHByb3ZlT2siLCJzcGVuZGVyIiwiUHJpbmNpcGFsIiwiZnJvbVRleHQiLCJ0cmFuc2FjdGlvbklkIiwiVW5zb2NrZXRCdXR0b24iLCJwbHVnX2lkIiwic29ja2V0X2lkIiwiU29ja2V0QnV0dG9uIiwiVXNlQnV0dG9uIiwic2V0SXNPcGVuIiwiY2FuY2VsUmVmIiwidXNlT2siLCJ1c2VEYXRhIiwiY29vbGRvd24iLCJtZW1vIiwidXNlIiwibXNnIiwiSlNPTiIsInN0cmluZ2lmeSIsImZvbnRTaXplIiwiVHJhbnNmZXJMaW5rQnV0dG9uIiwiY3JlYXRpbmdMaW5rIiwic2V0Q3JlYXRlTGluayIsImNvZGUiLCJzZXRMaW5rIiwibGluayIsIkJ1eUJ1dHRvbiIsIkJpZ0ludCIsImJ1eU9rIiwiZThzVG9JY3AiLCJCdXJuQnV0dG9uIiwiYnVybk9rIiwiUmVjaGFyZ2VCdXR0b24iLCJyZWNoYXJnZUNvc3QiLCJzZXRSZWNoYXJnZUNvc3QiLCJ0aGVuIiwicmUiLCJyZWNoYXJnZU9rIiwiTkZUUG9wb3ZlciIsIk5GVExhcmdlIiwibmZ0IiwidGh1bWIiLCJpcGZzIiwidXJsIiwiaW50ZXJuYWwiLCJleHRlcm5hbCIsImRvbWFpbiIsImF1dGhvciIsIk5GVCIsInRodW1iU2l6ZSIsInBvcG92ZXJPcGVuIiwic2V0UG9wb3ZlciIsInpJbmRleCIsInBvaW50ZXJFdmVudHMiLCJ0b3AiLCJsZWZ0Iiwid2lkdGgiLCJORlRDbGFpbSIsInAiLCJtYXRjaCIsInBhcmFtcyIsIk5GVFBhZ2UiLCJjbGFpbWVkIiwic2V0Q2xhaW1lZCIsInNldEVycm9yIiwiY2xhaW1pbmciLCJzZXRDbGFpbWluZyIsIm9uQ2xhaW0iLCJyZXNwIiwib2siLCJ1bmRlZmluZWQiLCJiZWFyZXIiLCJoaXN0b3J5IiwiTkZUQ29udGVudCIsImMiLCJjb250ZW50IiwiY3R5cGUiLCJjb250ZW50VHlwZSIsIk5GVFByZXZpZXciLCJORlRUaHVtYiIsIk5GVFRodW1iTGFyZ2UiLCJtYXJnaW5MZWZ0IiwiTWV0YURvbWFpblR3aXR0ZXIiLCJzaG93TGluayIsIlVSTCIsInN1cmwiLCJocmVmIiwicmVwbGFjZSIsImRvbWFpbkluZm8iLCJpbnZlbnRvcnkiLCJ2ZXJpZmllZCIsInVybFNhZmUiLCJhIiwiYiIsImQiLCJzcGxpdCIsIk1ldGFEb21haW4iLCJob3N0bmFtZSIsInBhdGhuYW1lIiwiY2FwaXRhbGl6ZSIsIngiLCJjaGFyQXQiLCJzbGljZSIsIk5GVEluZm8iLCJiZyIsInRleHRDb2xvciIsImlzRGFyayIsInFjb2xvciIsIml0ZW1RdWFsaXR5IiwicXVhbGl0eSIsImNvbG9yIiwibm93TWludXRlcyIsIk1hdGgiLCJmbG9vciIsIkRhdGUiLCJub3ciLCJ0aGluZ3MiLCJuYW1lIiwidGFncyIsImxlbmd0aCIsIm1hcCIsImlkeCIsInRyYW5zZmVyIiwibW9tZW50IiwiZHVyYXRpb24iLCJiaW5kc0R1cmF0aW9uIiwiaHVtYW5pemUiLCJib3VuZFVudGlsIiwiY29uc3VtYWJsZSIsImRlc2MiLCJjb29sZG93blVudGlsIiwic2VjcmV0IiwiaG9sZCIsImF0dHJpYnV0ZXMiLCJsb3JlIiwicmVjaGFyZ2VhYmxlIiwidHRsIiwic29ja2V0cyIsInRpZCIsImxpbmVIZWlnaHQiLCJmaWx0ZXIiLCJCb29sZWFuIiwiTkZUQmF0RnVsbCIsInNwYW4iLCJORlRCYXR0ZXJ5IiwiaWNwQ3ljbGVzIiwiTnVtYmVyIiwib3JhY2xlIiwiYXZnX21zZ19jb3N0X3B3ciIsIkFWR19NRVNTQUdFX0NPU1QiLCJGVUxMWV9DSEFSR0VEX01JTlVURVMiLCJtc2dfZnVsbCIsInBlcmMiLCJwd3IiLCJhdmdfbnVtX29wc19sZWZ0Iiwicm91bmQiLCJjb2xvckVtcHR5IiwiTkZUUHJvSW5mbyIsIndvcmRCcmVhayIsInRleHRUcmFuc2Zvcm0iLCJjcmVhdGVkIiwiZm9ybWF0IiwiZW50cm9weSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUVBOztBQVFBOztBQUNBOztBQXlCQTs7QUFDQTs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7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LE1BQXhCLENBRFYsQ0FERCxHQUlHLElBZk4sRUFnQkcxSSxJQUFJLENBQUNrSCxNQUFMLGdCQUNDLDZCQUFDLFlBQUQ7QUFBTSxJQUFBLFFBQVEsRUFBQyxLQUFmO0FBQXFCLElBQUEsRUFBRSxFQUFFO0FBQXpCLDhCQUNVLDZCQUFDLFNBQUQ7QUFBSyxJQUFBLEtBQUssRUFBRTtBQUFaLEtBQW1CbEgsSUFBSSxDQUFDa0gsTUFBeEIsQ0FEVixDQURELEdBSUcsSUFwQk4sRUFxQkdsSCxJQUFJLENBQUNvRCxXQUFMLGdCQUNDLDZCQUFDLFlBQUQ7QUFBTSxJQUFBLFFBQVEsRUFBQztBQUFmLHNDQUNrQix3Q0FBSSxDQUFDcEQsSUFBSSxDQUFDb0QsV0FBTCxHQUFtQixHQUFwQixFQUF5QkUsT0FBekIsQ0FBaUMsQ0FBakMsQ0FBSixNQURsQixDQURELEdBSUcsSUF6Qk4sRUEwQkd0RCxJQUFJLENBQUNtTyxPQUFMLGdCQUNDLDZCQUFDLFlBQUQ7QUFBTSxJQUFBLFFBQVEsRUFBQztBQUFmLGlCQUNXLHFCQUFPbk8sSUFBSSxDQUFDbU8sT0FBTCxHQUFlLEVBQWYsR0FBb0IsSUFBM0IsRUFBaUNDLE1BQWpDLENBQXdDLE1BQXhDLENBRFgsQ0FERCxHQUlHLElBOUJOLEVBK0JHcE8sSUFBSSxDQUFDcU8sT0FBTCxnQkFDQyw2QkFBQyxZQUFEO0FBQU0sSUFBQSxRQUFRLEVBQUM7QUFBZiwrQkFDVyw2QkFBQyxVQUFELFFBQU8sdUJBQVlyTyxJQUFJLENBQUNxTyxPQUFqQixDQUFQLENBRFgsQ0FERCxHQUlHLElBbkNOLENBVEYsQ0FERjtBQWlERCxDQXhETSIsInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbCBCaWdJbnQgKi9cbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7XG4gIFRleHQsXG4gIHVzZUNvbG9yTW9kZSxcbiAgU3RhY2ssXG4gIEJveCxcbiAgdXNlQ29sb3JNb2RlVmFsdWUsXG4gIEFic29sdXRlQ2VudGVyLFxufSBmcm9tIFwiQGNoYWtyYS11aS9yZWFjdFwiO1xuaW1wb3J0IHsgaXRlbVF1YWxpdHkgfSBmcm9tIFwiQHZ2di1pbnRlcmFjdGl2ZS9uZnRhbnZpbC10b29scy9janMvaXRlbXMuanNcIjtcbmltcG9ydCB7XG4gIG5mdF9mZXRjaCxcbiAgbmZ0X2VudGVyX2NvZGUsXG4gIG5mdF9idXJuLFxuICBuZnRfdHJhbnNmZXIsXG4gIG5mdF91c2UsXG4gIG5mdF90cmFuc2Zlcl9saW5rLFxuICBuZnRfY2xhaW1fbGluayxcbiAgbmZ0X3BsdWcsXG4gIG5mdF91bnNvY2tldCxcbiAgbmZ0X2FwcHJvdmUsXG4gIG5mdF9zZXRfcHJpY2UsXG4gIG5mdF9wdXJjaGFzZSxcbiAgbmZ0X3JlY2hhcmdlLFxuICBuZnRfcmVjaGFyZ2VfcXVvdGUsXG59IGZyb20gXCIuLi9yZWR1Y2Vycy9uZnRcIjtcblxuaW1wb3J0IHtcbiAgTnVtYmVySW5wdXQsXG4gIE51bWJlcklucHV0RmllbGQsXG4gIE51bWJlcklucHV0U3RlcHBlcixcbiAgTnVtYmVySW5jcmVtZW50U3RlcHBlcixcbiAgTnVtYmVyRGVjcmVtZW50U3RlcHBlcixcbn0gZnJvbSBcIkBjaGFrcmEtdWkvcmVhY3RcIjtcblxuaW1wb3J0IHsgdmVyaWZ5X2RvbWFpbiwgdmVyaWZ5X2RvbWFpblR3aXR0ZXIgfSBmcm9tIFwiLi4vcmVkdWNlcnMvaW52ZW50b3J5XCI7XG5pbXBvcnQgeyBOZnRIaXN0b3J5IH0gZnJvbSBcIi4vSGlzdG9yeVwiO1xuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gXCJAY2hha3JhLXVpL3JlYWN0XCI7XG5pbXBvcnQgQ29uZmV0dGkgZnJvbSBcIi4vQ29uZmV0dGlcIjtcbmltcG9ydCB7IExvZ2luUmVxdWlyZWQgfSBmcm9tIFwiLi9Mb2dpblJlcXVpcmVkXCI7XG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gXCJyZWFjdC10b2FzdGlmeVwiO1xuaW1wb3J0IGxvZGFzaCBmcm9tIFwibG9kYXNoXCI7XG5pbXBvcnQgeyB0b2tlbkZyb21UZXh0IH0gZnJvbSBcIkB2dnYtaW50ZXJhY3RpdmUvbmZ0YW52aWwtdG9vbHMvY2pzL3Rva2VuLmpzXCI7XG5pbXBvcnQge1xuICB1c2VBbnZpbFNlbGVjdG9yIGFzIHVzZVNlbGVjdG9yLFxuICB1c2VBbnZpbERpc3BhdGNoIGFzIHVzZURpc3BhdGNoLFxufSBmcm9tIFwiLi4vaW5kZXguanNcIjtcbmltcG9ydCB7XG4gIENlbnRlcixcbiAgQnV0dG9uLFxuICBXcmFwLFxuICB1c2VEaXNjbG9zdXJlLFxuICBGb3JtTGFiZWwsXG4gIEZvcm1Db250cm9sLFxuICBJbnB1dCxcbiAgVG9vbHRpcCxcbn0gZnJvbSBcIkBjaGFrcmEtdWkvcmVhY3RcIjtcbmltcG9ydCB7XG4gIE1vZGFsLFxuICBNb2RhbE92ZXJsYXksXG4gIE1vZGFsQ29udGVudCxcbiAgTW9kYWxIZWFkZXIsXG4gIE1vZGFsRm9vdGVyLFxuICBNb2RhbEJvZHksXG4gIE1vZGFsQ2xvc2VCdXR0b24sXG4gIEhTdGFjayxcbiAgVGFnLFxufSBmcm9tIFwiQGNoYWtyYS11aS9yZWFjdFwiO1xuaW1wb3J0IHtcbiAgQWxlcnREaWFsb2csXG4gIEFsZXJ0RGlhbG9nQm9keSxcbiAgQWxlcnREaWFsb2dGb290ZXIsXG4gIEFsZXJ0RGlhbG9nSGVhZGVyLFxuICBBbGVydERpYWxvZ0NvbnRlbnQsXG4gIEFsZXJ0RGlhbG9nT3ZlcmxheSxcbn0gZnJvbSBcIkBjaGFrcmEtdWkvcmVhY3RcIjtcbmltcG9ydCB7XG4gIEFsZXJ0LFxuICBBbGVydEljb24sXG4gIEFsZXJ0VGl0bGUsXG4gIEFsZXJ0RGVzY3JpcHRpb24sXG4gIEZsZXgsXG4gIFNwYWNlcixcbn0gZnJvbSBcIkBjaGFrcmEtdWkvcmVhY3RcIjtcbmltcG9ydCB7IFZlcmlmaWVkSWNvbiB9IGZyb20gXCIuLi9pY29uc1wiO1xuaW1wb3J0IG1vbWVudCBmcm9tIFwibW9tZW50XCI7XG5pbXBvcnQgc3R5bGVkIGZyb20gXCJAZW1vdGlvbi9zdHlsZWRcIjtcbmltcG9ydCB0aHVtYl9iZyBmcm9tIFwiLi4vYXNzZXRzL2RlZmF1bHQucG5nXCI7XG5pbXBvcnQgdGh1bWJfb3ZlciBmcm9tIFwiLi4vYXNzZXRzL292ZXIucG5nXCI7XG5pbXBvcnQgKiBhcyBBY2NvdW50SWRlbnRpZmllciBmcm9tIFwiQHZ2di1pbnRlcmFjdGl2ZS9uZnRhbnZpbC10b29scy9janMvYWNjb3VudGlkZW50aWZpZXIuanNcIjtcbmltcG9ydCAqIGFzIFRyYW5zYWN0aW9uSWQgZnJvbSBcIkB2dnYtaW50ZXJhY3RpdmUvbmZ0YW52aWwtdG9vbHMvY2pzL3RyYW5zYWN0aW9uaWQuanNcIjtcbmltcG9ydCB7IFByaW5jaXBhbCB9IGZyb20gXCJAZGZpbml0eS9wcmluY2lwYWxcIjtcbmltcG9ydCB7XG4gIFRyYW5zYWN0aW9uVG9hc3QsXG4gIFRyYW5zYWN0aW9uRmFpbGVkLFxufSBmcm9tIFwiLi4vY29tcG9uZW50cy9UcmFuc2FjdGlvblRvYXN0XCI7XG5pbXBvcnQgeyBUWCwgQUNDLCBORlRBLCBIQVNILCBJQ1AsIFBXUiB9IGZyb20gXCIuL0NvZGVcIjtcbmltcG9ydCB7IHRvSGV4U3RyaW5nIH0gZnJvbSBcIkB2dnYtaW50ZXJhY3RpdmUvbmZ0YW52aWwtdG9vbHMvY2pzL2RhdGEuanNcIjtcbmltcG9ydCB7IE1BUktFVFBMQUNFX0FJRCwgTUFSS0VUUExBQ0VfU0hBUkUsIEFOVklMX1NIQVJFIH0gZnJvbSBcIi4uL2NvbmZpZy5qc1wiO1xuaW1wb3J0IHtcbiAgQVZHX01FU1NBR0VfQ09TVCxcbiAgRlVMTFlfQ0hBUkdFRF9NSU5VVEVTLFxufSBmcm9tIFwiQHZ2di1pbnRlcmFjdGl2ZS9uZnRhbnZpbC10b29scy9janMvcHJpY2luZy5qc1wiO1xuXG5jb25zdCBDb250ZW50Qm94ID0gc3R5bGVkLmRpdmBcbiAgbWFyZ2luOiAxMnB4IDBweDtcblxuICB2aWRlbyxcbiAgaW1nIHtcbiAgICBtYXgtd2lkdGg6IDg1dnc7XG4gICAgbWF4LWhlaWdodDogODV2aDtcbiAgICBtYXJnaW4tYm90dG9tOiA1dmg7XG4gICAgbWFyZ2luLXRvcDogMXZoO1xuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgfVxuYDtcblxuY29uc3QgVGh1bWIgPSBzdHlsZWQuZGl2YFxuICB3aWR0aDogNzJweDtcbiAgaGVpZ2h0OiA3MnB4O1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm94LW92ZXJmbG93OiBoaWRkZW47XG5cbiAgLmJvcmRlciB7XG4gICAgdG9wOiAwcHg7XG4gICAgbGVmdDogMHB4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBiYWNrZ3JvdW5kOiB1cmwoJHt0aHVtYl9iZ30pO1xuICAgIGJhY2tncm91bmQtc2l6ZTogNzJweCA3MnB4O1xuICAgIHdpZHRoOiA3MnB4O1xuICAgIGhlaWdodDogNzJweDtcblxuICAgICY6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7dGh1bWJfb3Zlcn0pO1xuICAgIH1cbiAgfVxuICAuY3VzdG9tIHtcbiAgICB0b3A6IDBweDtcbiAgICBsZWZ0OiAwcHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIG1hcmdpbjogNHB4IDRweDtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgICBvYmplY3QtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XG4gICAgaGVpZ2h0OiA2NHB4O1xuICAgIHdpZHRoOiA2NHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgfVxuYDtcblxuY29uc3QgVGh1bWJMYXJnZSA9IHN0eWxlZC5kaXZgXG4gIHdpZHRoOiAyMTZweDtcbiAgaGVpZ2h0OiAyNzBweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBib3gtb3ZlcmZsb3c6IGhpZGRlbjtcblxuICAuY3VzdG9tIHtcbiAgICB0b3A6IDBweDtcbiAgICBsZWZ0OiAwcHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIG9iamVjdC1maXQ6IGNvdmVyO1xuICAgIG9iamVjdC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcbiAgICBoZWlnaHQ6IDIxNnB4O1xuICAgIHdpZHRoOiAyMTZweDtcbiAgICBib3JkZXItcmFkaXVzOiA4cHggOHB4IDBweCAwcHg7XG4gIH1cblxuICAuaW5mbyB7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBwYWRkaW5nLWJvdHRvbTogM3B4O1xuICAgIHBhZGRpbmctbGVmdDogMTBweDtcbiAgICBib3JkZXItcmFkaXVzOiAwcHggMHB4IDZweCA2cHg7XG4gICAgbGVmdDogMHB4O1xuICAgIGJvdHRvbTogMHB4O1xuICAgIHJpZ2h0OiAwcHg7XG4gICAgaGVpZ2h0OiA1NHB4O1xuICAgIC8vIHRleHQtc2hhZG93OiA0cHggNHB4IDJweCByZ2JhKDAsIDAsIDAsIDAuNik7XG4gICAgYmFja2dyb3VuZDogJHsocHJvcHMpID0+IChwcm9wcy5tb2RlID09PSBcImxpZ2h0XCIgPyBcIiNmZmZcIiA6IFwiIzFkMWIyNFwiKX07XG4gICAgYm9yZGVyOiAxcHggc29saWRcbiAgICAgICR7KHByb3BzKSA9PiAocHJvcHMubW9kZSA9PT0gXCJsaWdodFwiID8gXCIjYzRiY2RiXCIgOiBcIiMzZjM4NTVcIil9O1xuICAgIGJvcmRlci10b3A6IDBweCBzb2xpZDtcbiAgICAubGFiZWwge1xuICAgICAgZm9udC1zaXplOiA5cHg7XG4gICAgICBtYXJnaW4tYm90dG9tOiAtMnB4O1xuICAgIH1cbiAgICAuY29sbGVjdGlvbiB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDBweDtcbiAgICB9XG4gICAgLmF1dGhvciB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDE5cHg7XG4gICAgfVxuICAgIC5wcmljZSB7XG4gICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogMTlweDtcbiAgICAgIHJpZ2h0OiA4cHg7XG4gICAgfVxuICB9XG5gO1xuXG5leHBvcnQgY29uc3QgTkZUTWVudSA9ICh7IGlkLCBtZXRhLCBvd25lciwgbm9idXkgPSBmYWxzZSB9KSA9PiB7XG4gIGNvbnN0IHBybyA9IHVzZVNlbGVjdG9yKChzdGF0ZSkgPT4gc3RhdGUudXNlci5wcm8pO1xuXG4gIHJldHVybiAoXG4gICAgPEJveCBwPXszfSBtYXhXaWR0aD1cIjM3NXB4XCIgdGV4dEFsaWduPVwianVzdGlmeVwiPlxuICAgICAge293bmVyID8gKFxuICAgICAgICA8V3JhcCBzcGFjaW5nPVwiM1wiPlxuICAgICAgICAgIDxVc2VCdXR0b24gaWQ9e2lkfSBtZXRhPXttZXRhfSAvPlxuICAgICAgICAgIHtwcm8gPyA8UmVjaGFyZ2VCdXR0b24gaWQ9e2lkfSBtZXRhPXttZXRhfSAvPiA6IG51bGx9XG5cbiAgICAgICAgICA8VHJhbnNmZXJCdXR0b24gaWQ9e2lkfSBtZXRhPXttZXRhfSAvPlxuICAgICAgICAgIHtwcm8gPyA8QXBwcm92ZUJ1dHRvbiBpZD17aWR9IG1ldGE9e21ldGF9IC8+IDogbnVsbH1cbiAgICAgICAgICA8VHJhbnNmZXJMaW5rQnV0dG9uIGlkPXtpZH0gbWV0YT17bWV0YX0gLz5cbiAgICAgICAgICA8U2V0UHJpY2VCdXR0b24gaWQ9e2lkfSBtZXRhPXttZXRhfSAvPlxuXG4gICAgICAgICAge3BybyA/IDxCdXJuQnV0dG9uIGlkPXtpZH0gbWV0YT17bWV0YX0gLz4gOiBudWxsfVxuICAgICAgICAgIHtwcm8gPyA8U29ja2V0QnV0dG9uIGlkPXtpZH0gbWV0YT17bWV0YX0gLz4gOiBudWxsfVxuICAgICAgICAgIHtwcm8gPyA8VW5zb2NrZXRCdXR0b24gaWQ9e2lkfSBtZXRhPXttZXRhfSAvPiA6IG51bGx9XG4gICAgICAgIDwvV3JhcD5cbiAgICAgICkgOiAoXG4gICAgICAgIDxXcmFwPlxuICAgICAgICAgIHshbm9idXkgJiYgbWV0YS50cmFuc2ZlcmFibGUgJiYgbWV0YS5wcmljZS5hbW91bnQgIT09IFwiMFwiID8gKFxuICAgICAgICAgICAgPExvZ2luUmVxdWlyZWQgbGFiZWw9XCJBdXRoZW50aWNhdGUgdG8gYnV5XCI+XG4gICAgICAgICAgICAgIDxCdXlCdXR0b24gaWQ9e2lkfSBtZXRhPXttZXRhfSAvPlxuICAgICAgICAgICAgPC9Mb2dpblJlcXVpcmVkPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICA8L1dyYXA+XG4gICAgICApfVxuICAgIDwvQm94PlxuICApO1xufTtcblxuZnVuY3Rpb24gU2V0UHJpY2VCdXR0b24oeyBpZCwgbWV0YSB9KSB7XG4gIGNvbnN0IHsgaXNPcGVuLCBvbk9wZW4sIG9uQ2xvc2UgfSA9IHVzZURpc2Nsb3N1cmUoKTtcbiAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuICBjb25zdCBhZGRyZXNzID0gdXNlU2VsZWN0b3IoKHN0YXRlKSA9PiBzdGF0ZS51c2VyLmFkZHJlc3MpO1xuXG4gIGNvbnN0IGluaXRpYWxSZWYgPSBSZWFjdC51c2VSZWYoKTtcbiAgY29uc3QgcmVtb3ZlU2FsZSA9IGFzeW5jICgpID0+IHtcbiAgICBvbkNsb3NlKCk7XG4gICAgbGV0IHRvYXN0SWQgPSB0b2FzdChcIlJlbW92aW5nIGZyb20gc2FsZS4uLlwiLCB7XG4gICAgICB0eXBlOiB0b2FzdC5UWVBFLklORk8sXG4gICAgICBwb3NpdGlvbjogXCJib3R0b20tcmlnaHRcIixcbiAgICAgIGF1dG9DbG9zZTogZmFsc2UsXG4gICAgICBoaWRlUHJvZ3Jlc3NCYXI6IGZhbHNlLFxuICAgICAgY2xvc2VPbkNsaWNrOiBmYWxzZSxcbiAgICAgIHBhdXNlT25Ib3ZlcjogdHJ1ZSxcbiAgICAgIGRyYWdnYWJsZTogZmFsc2UsXG4gICAgfSk7XG5cbiAgICBsZXQgcHJpY2UgPSB7XG4gICAgICBhbW91bnQ6IDAsXG4gICAgICBtYXJrZXRwbGFjZTogW1xuICAgICAgICB7XG4gICAgICAgICAgYWRkcmVzczogQWNjb3VudElkZW50aWZpZXIuVGV4dFRvQXJyYXkoTUFSS0VUUExBQ0VfQUlEKSxcbiAgICAgICAgICBzaGFyZTogTUFSS0VUUExBQ0VfU0hBUkUsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgZGlzcGF0Y2gobmZ0X3NldF9wcmljZSh7IGlkLCBwcmljZSB9KSk7XG5cbiAgICAgIHRvYXN0LnVwZGF0ZSh0b2FzdElkLCB7XG4gICAgICAgIHR5cGU6IHRvYXN0LlRZUEUuU1VDQ0VTUyxcbiAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgcmVuZGVyOiAoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXY+UmVtb3ZlZCBmcm9tIHNhbGUuPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICksXG4gICAgICAgIGF1dG9DbG9zZTogOTAwMCxcbiAgICAgICAgcGF1c2VPbkhvdmVyOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihcIlJlbW92ZSBmcm9tIHNhbGUgZXJyb3JcIiwgZSk7XG4gICAgICB0b2FzdC51cGRhdGUodG9hc3RJZCwge1xuICAgICAgICB0eXBlOiB0b2FzdC5UWVBFLkVSUk9SLFxuICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICBjbG9zZU9uQ2xpY2s6IHRydWUsXG5cbiAgICAgICAgcmVuZGVyOiAoXG4gICAgICAgICAgPFRyYW5zYWN0aW9uRmFpbGVkXG4gICAgICAgICAgICB0aXRsZT1cIlJlbW92aW5nIGZyb20gc2FsZSBmYWlsZWRcIlxuICAgICAgICAgICAgbWVzc2FnZT17ZS5tZXNzYWdlfVxuICAgICAgICAgIC8+XG4gICAgICAgICksXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHNldFByaWNlT2sgPSBhc3luYyAoKSA9PiB7XG4gICAgbGV0IHByaWNldmFsID0gcGFyc2VGbG9hdChpbml0aWFsUmVmLmN1cnJlbnQudmFsdWUpO1xuXG4gICAgbGV0IGFtb3VudCA9IEFjY291bnRJZGVudGlmaWVyLmljcFRvRThzKFxuICAgICAgcHJpY2V2YWwgL1xuICAgICAgICAoMSAtIChNQVJLRVRQTEFDRV9TSEFSRSArIEFOVklMX1NIQVJFICsgbWV0YS5hdXRob3JTaGFyZSkgLyAxMDAwMClcbiAgICApO1xuXG4gICAgbGV0IHByaWNlID0ge1xuICAgICAgYW1vdW50OiBhbW91bnQsXG4gICAgICBtYXJrZXRwbGFjZTogW1xuICAgICAgICB7XG4gICAgICAgICAgYWRkcmVzczogQWNjb3VudElkZW50aWZpZXIuVGV4dFRvQXJyYXkoTUFSS0VUUExBQ0VfQUlEKSxcbiAgICAgICAgICBzaGFyZTogTUFSS0VUUExBQ0VfU0hBUkUsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gICAgY29uc29sZS5sb2cocHJpY2UpO1xuXG4gICAgb25DbG9zZSgpO1xuICAgIGxldCB0b2FzdElkID0gdG9hc3QoXCJTZXR0aW5nIHByaWNlLi4uXCIsIHtcbiAgICAgIHR5cGU6IHRvYXN0LlRZUEUuSU5GTyxcbiAgICAgIHBvc2l0aW9uOiBcImJvdHRvbS1yaWdodFwiLFxuICAgICAgYXV0b0Nsb3NlOiBmYWxzZSxcbiAgICAgIGhpZGVQcm9ncmVzc0JhcjogZmFsc2UsXG4gICAgICBjbG9zZU9uQ2xpY2s6IGZhbHNlLFxuICAgICAgcGF1c2VPbkhvdmVyOiB0cnVlLFxuICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBkaXNwYXRjaChuZnRfc2V0X3ByaWNlKHsgaWQsIHByaWNlIH0pKTtcblxuICAgICAgdG9hc3QudXBkYXRlKHRvYXN0SWQsIHtcbiAgICAgICAgdHlwZTogdG9hc3QuVFlQRS5TVUNDRVNTLFxuICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICByZW5kZXI6IChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdj5TZXR0aW5nIHByaWNlIHN1Y2Nlc3NmdWxsLjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApLFxuICAgICAgICBhdXRvQ2xvc2U6IDkwMDAsXG4gICAgICAgIHBhdXNlT25Ib3ZlcjogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJTZXRQcmljZSBlcnJvclwiLCBlKTtcbiAgICAgIHRvYXN0LnVwZGF0ZSh0b2FzdElkLCB7XG4gICAgICAgIHR5cGU6IHRvYXN0LlRZUEUuRVJST1IsXG4gICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgIGNsb3NlT25DbGljazogdHJ1ZSxcblxuICAgICAgICByZW5kZXI6IChcbiAgICAgICAgICA8VHJhbnNhY3Rpb25GYWlsZWQgdGl0bGU9XCJTZXR0aW5nIHByaWNlIGZhaWxlZFwiIG1lc3NhZ2U9e2UubWVzc2FnZX0gLz5cbiAgICAgICAgKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8QnV0dG9uIG9uQ2xpY2s9e29uT3Blbn0+U2VsbDwvQnV0dG9uPlxuXG4gICAgICA8TW9kYWxcbiAgICAgICAgaW5pdGlhbEZvY3VzUmVmPXtpbml0aWFsUmVmfVxuICAgICAgICBvbkNsb3NlPXtvbkNsb3NlfVxuICAgICAgICBpc09wZW49e2lzT3Blbn1cbiAgICAgICAgaXNDZW50ZXJlZFxuICAgICAgICBzaXplPXtcInhsXCJ9XG4gICAgICAgIHByZXNlcnZlU2Nyb2xsQmFyR2FwPXt0cnVlfVxuICAgICAgPlxuICAgICAgICA8TW9kYWxPdmVybGF5IC8+XG4gICAgICAgIDxNb2RhbENvbnRlbnQ+XG4gICAgICAgICAgPE1vZGFsSGVhZGVyPlNldCBTZWxsIFByaWNlPC9Nb2RhbEhlYWRlcj5cbiAgICAgICAgICA8TW9kYWxDbG9zZUJ1dHRvbiAvPlxuICAgICAgICAgIDxNb2RhbEJvZHk+XG4gICAgICAgICAgICA8Rm9ybUNvbnRyb2w+XG4gICAgICAgICAgICAgIDxGb3JtTGFiZWw+XG4gICAgICAgICAgICAgICAgUHJpY2UgaW4gPElDUCAvPlxuICAgICAgICAgICAgICA8L0Zvcm1MYWJlbD5cblxuICAgICAgICAgICAgICA8TnVtYmVySW5wdXRcbiAgICAgICAgICAgICAgICB3PXtcIjEwMCVcIn1cbiAgICAgICAgICAgICAgICBwcmVjaXNpb249ezR9XG4gICAgICAgICAgICAgICAgc3RlcD17MC4wMX1cbiAgICAgICAgICAgICAgICAvL21heD1cIjAuMTJcIlxuICAgICAgICAgICAgICAgIG1pbj1cIjBcIlxuICAgICAgICAgICAgICAgIHZhcmlhbnQ9XCJmaWxsZWRcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPE51bWJlcklucHV0RmllbGQgcmVmPXtpbml0aWFsUmVmfSAvPlxuICAgICAgICAgICAgICAgIDxOdW1iZXJJbnB1dFN0ZXBwZXI+XG4gICAgICAgICAgICAgICAgICA8TnVtYmVySW5jcmVtZW50U3RlcHBlciAvPlxuICAgICAgICAgICAgICAgICAgPE51bWJlckRlY3JlbWVudFN0ZXBwZXIgLz5cbiAgICAgICAgICAgICAgICA8L051bWJlcklucHV0U3RlcHBlcj5cbiAgICAgICAgICAgICAgPC9OdW1iZXJJbnB1dD5cblxuICAgICAgICAgICAgICB7LyogPElucHV0ICByZWY9e2luaXRpYWxSZWZ9IHBsYWNlaG9sZGVyPVwiMC4wMDFcIiBtYXg9XCIwLjA2XCIgbWluPVwiMC4wMDA0XCIvPiAqL31cbiAgICAgICAgICAgIDwvRm9ybUNvbnRyb2w+XG4gICAgICAgICAgICA8Qm94IGZvbnRTaXplPVwiMTJweFwiIG10PXsyfT5cbiAgICAgICAgICAgICAgPFRleHQ+VGhlIGFtb3VudCB5b3Ugc3BlY2lmeSBpcyBpbmNyZWFzZWQgYnk6PC9UZXh0PlxuICAgICAgICAgICAgICA8VGV4dD5cbiAgICAgICAgICAgICAgICB7KE1BUktFVFBMQUNFX1NIQVJFIC8gMTAwKS50b0ZpeGVkKDIpfSUgTWFya2V0cGxhY2Ugc2hhcmUuXG4gICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgPFRleHQ+XG4gICAgICAgICAgICAgICAgeyhBTlZJTF9TSEFSRSAvIDEwMCkudG9GaXhlZCgyKX0lIEFudmlsIHByb3RvY29sIHNoYXJlLlxuICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICAgIDxUZXh0PlxuICAgICAgICAgICAgICAgIHsobWV0YS5hdXRob3JTaGFyZSAvIDEwMCkudG9GaXhlZCgyKX0lIE5GVCBhdXRob3Igc2hhcmUuXG4gICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgPFRleHQ+XG4gICAgICAgICAgICAgICAgQWRkaXRpb25hbCBmbGF0IHJlY2hhcmdlIGZlZSBpZiBpdCdzIG5vdCBmdWxseSBjaGFyZ2VkLlxuICAgICAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgICA8L0JveD5cbiAgICAgICAgICA8L01vZGFsQm9keT5cbiAgICAgICAgICA8TW9kYWxGb290ZXI+XG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e29uQ2xvc2V9PkNhbmNlbDwvQnV0dG9uPlxuICAgICAgICAgICAgPEJ1dHRvbiBtbD17M30gb25DbGljaz17cmVtb3ZlU2FsZX0+XG4gICAgICAgICAgICAgIFJlbW92ZSBmcm9tIHNhbGVcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPEJ1dHRvbiBtbD17M30gb25DbGljaz17c2V0UHJpY2VPa30+XG4gICAgICAgICAgICAgIFNldCBmb3Igc2FsZVxuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPC9Nb2RhbEZvb3Rlcj5cbiAgICAgICAgPC9Nb2RhbENvbnRlbnQ+XG4gICAgICA8L01vZGFsPlxuICAgIDwvPlxuICApO1xufVxuXG5mdW5jdGlvbiBUcmFuc2ZlckJ1dHRvbih7IGlkLCBtZXRhIH0pIHtcbiAgY29uc3QgeyBpc09wZW4sIG9uT3Blbiwgb25DbG9zZSB9ID0gdXNlRGlzY2xvc3VyZSgpO1xuICBjb25zdCBbYWxlcnRPcGVuLCBzZXRBbGVydE9wZW5dID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcbiAgY29uc3QgaW5pdGlhbFJlZiA9IFJlYWN0LnVzZVJlZigpO1xuXG4gIGNvbnN0IGNvbmZpcm1PayA9IGFzeW5jICgpID0+IHtcbiAgICBsZXQgdG9BZGRyZXNzID0gaW5pdGlhbFJlZi5jdXJyZW50LnZhbHVlLnRvVXBwZXJDYXNlKCk7XG5cbiAgICBvbkNsb3NlKCk7XG5cbiAgICBhd2FpdCBkaXNwYXRjaChuZnRfdHJhbnNmZXIoeyBpZCwgdG9BZGRyZXNzIH0pKTtcbiAgfTtcblxuICBjb25zdCB0cmFuc2Zlck9rID0gYXN5bmMgKCkgPT4ge1xuICAgIGxldCB0b0FkZHJlc3MgPSBpbml0aWFsUmVmLmN1cnJlbnQudmFsdWUudG9VcHBlckNhc2UoKTtcbiAgICBpZiAodG9BZGRyZXNzLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcImEwMFwiKSAhPT0gMCkge1xuICAgICAgc2V0QWxlcnRPcGVuKHRydWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG9uQ2xvc2UoKTtcblxuICAgIGF3YWl0IGRpc3BhdGNoKG5mdF90cmFuc2Zlcih7IGlkLCB0b0FkZHJlc3MgfSkpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxCdXR0b24gb25DbGljaz17b25PcGVufSBpc0Rpc2FibGVkPXshbWV0YS50cmFuc2ZlcmFibGV9PlxuICAgICAgICBUcmFuc2ZlclxuICAgICAgPC9CdXR0b24+XG5cbiAgICAgIDxBbGVydERpYWxvZyBpc09wZW49e2FsZXJ0T3Blbn0gcHJlc2VydmVTY3JvbGxCYXJHYXA9e3RydWV9PlxuICAgICAgICA8QWxlcnREaWFsb2dPdmVybGF5PlxuICAgICAgICAgIDxBbGVydERpYWxvZ0NvbnRlbnQ+XG4gICAgICAgICAgICA8QWxlcnREaWFsb2dIZWFkZXIgZm9udFNpemU9XCJsZ1wiIGZvbnRXZWlnaHQ9XCJib2xkXCI+XG4gICAgICAgICAgICAgIDxBbGVydCBzdGF0dXM9XCJlcnJvclwiPlxuICAgICAgICAgICAgICAgIDxBbGVydEljb24gLz5cbiAgICAgICAgICAgICAgICA8QWxlcnRUaXRsZT5cbiAgICAgICAgICAgICAgICAgIHtcIiBcIn1cbiAgICAgICAgICAgICAgICAgIFdhcm5pbmchXG4gICAgICAgICAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICAgICAgICAgIEFkZHJlc3MgbWF5IG5vdCBzdXBwb3J0IHRoaXMgTkZUXG4gICAgICAgICAgICAgICAgPC9BbGVydFRpdGxlPlxuICAgICAgICAgICAgICA8L0FsZXJ0PlxuICAgICAgICAgICAgPC9BbGVydERpYWxvZ0hlYWRlcj5cblxuICAgICAgICAgICAgPEFsZXJ0RGlhbG9nQm9keT5cbiAgICAgICAgICAgICAgQWxsIE5GVEFudmlsIGFkZHJlc3NlcyBzdGFydCB3aXRoIEEwMCBhbmQgdGhpcyBvbmUgZG9lc24ndC4gSWYgeW91XG4gICAgICAgICAgICAgIHNlbmQgdG8gc3VjaCBhZGRyZXNzIHlvdSBtYXkgbm90IGJlIGFibGUgdG8gYWNjZXNzIHlvdXIgTkZULlxuICAgICAgICAgICAgPC9BbGVydERpYWxvZ0JvZHk+XG5cbiAgICAgICAgICAgIDxBbGVydERpYWxvZ0Zvb3Rlcj5cbiAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRBbGVydE9wZW4oZmFsc2UpfT5DYW5jZWw8L0J1dHRvbj5cbiAgICAgICAgICAgICAgPEJ1dHRvbiBjb2xvclNjaGVtZT1cInJlZFwiIG9uQ2xpY2s9e2NvbmZpcm1Pa30gbWw9ezN9PlxuICAgICAgICAgICAgICAgIFNlbmQgYW55d2F5XG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9BbGVydERpYWxvZ0Zvb3Rlcj5cbiAgICAgICAgICA8L0FsZXJ0RGlhbG9nQ29udGVudD5cbiAgICAgICAgPC9BbGVydERpYWxvZ092ZXJsYXk+XG4gICAgICA8L0FsZXJ0RGlhbG9nPlxuXG4gICAgICA8TW9kYWxcbiAgICAgICAgaW5pdGlhbEZvY3VzUmVmPXtpbml0aWFsUmVmfVxuICAgICAgICBvbkNsb3NlPXtvbkNsb3NlfVxuICAgICAgICBpc09wZW49e2lzT3Blbn1cbiAgICAgICAgaXNDZW50ZXJlZFxuICAgICAgICBzaXplPXtcInhsXCJ9XG4gICAgICAgIHByZXNlcnZlU2Nyb2xsQmFyR2FwPXt0cnVlfVxuICAgICAgPlxuICAgICAgICA8TW9kYWxPdmVybGF5IC8+XG4gICAgICAgIDxNb2RhbENvbnRlbnQ+XG4gICAgICAgICAgPE1vZGFsSGVhZGVyPlNlbmQgTkZUPC9Nb2RhbEhlYWRlcj5cbiAgICAgICAgICA8TW9kYWxDbG9zZUJ1dHRvbiAvPlxuICAgICAgICAgIDxNb2RhbEJvZHk+XG4gICAgICAgICAgICA8Rm9ybUNvbnRyb2w+XG4gICAgICAgICAgICAgIDxGb3JtTGFiZWw+VG8gQWRkcmVzczwvRm9ybUxhYmVsPlxuICAgICAgICAgICAgICA8SW5wdXQgcmVmPXtpbml0aWFsUmVmfSBwbGFjZWhvbGRlcj1cIjUwZTNkZjMuLi5cIiAvPlxuICAgICAgICAgICAgPC9Gb3JtQ29udHJvbD5cbiAgICAgICAgICA8L01vZGFsQm9keT5cbiAgICAgICAgICA8TW9kYWxGb290ZXI+XG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e29uQ2xvc2V9PkNhbmNlbDwvQnV0dG9uPlxuICAgICAgICAgICAgPEJ1dHRvbiBtbD17M30gb25DbGljaz17dHJhbnNmZXJPa30+XG4gICAgICAgICAgICAgIFNlbmRcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvTW9kYWxGb290ZXI+XG4gICAgICAgIDwvTW9kYWxDb250ZW50PlxuICAgICAgPC9Nb2RhbD5cbiAgICA8Lz5cbiAgKTtcbn1cblxuZnVuY3Rpb24gQXBwcm92ZUJ1dHRvbih7IGlkLCBtZXRhIH0pIHtcbiAgY29uc3QgeyBpc09wZW4sIG9uT3Blbiwgb25DbG9zZSB9ID0gdXNlRGlzY2xvc3VyZSgpO1xuICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XG4gIGNvbnN0IGluaXRpYWxSZWYgPSBSZWFjdC51c2VSZWYoKTtcblxuICBjb25zdCBhcHByb3ZlT2sgPSBhc3luYyAoKSA9PiB7XG4gICAgbGV0IHNwZW5kZXIgPSBQcmluY2lwYWwuZnJvbVRleHQoaW5pdGlhbFJlZi5jdXJyZW50LnZhbHVlKTtcblxuICAgIG9uQ2xvc2UoKTtcbiAgICBsZXQgdG9hc3RJZCA9IHRvYXN0KFwiQXBwcm92aW5nLi4uXCIsIHtcbiAgICAgIHR5cGU6IHRvYXN0LlRZUEUuSU5GTyxcbiAgICAgIHBvc2l0aW9uOiBcImJvdHRvbS1yaWdodFwiLFxuICAgICAgYXV0b0Nsb3NlOiBmYWxzZSxcbiAgICAgIGhpZGVQcm9ncmVzc0JhcjogZmFsc2UsXG4gICAgICBjbG9zZU9uQ2xpY2s6IGZhbHNlLFxuICAgICAgcGF1c2VPbkhvdmVyOiB0cnVlLFxuICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICB9KTtcbiAgICB0cnkge1xuICAgICAgbGV0IHsgdHJhbnNhY3Rpb25JZCB9ID0gYXdhaXQgZGlzcGF0Y2gobmZ0X2FwcHJvdmUoeyBpZCwgc3BlbmRlciB9KSk7XG5cbiAgICAgIHRvYXN0LnVwZGF0ZSh0b2FzdElkLCB7XG4gICAgICAgIHR5cGU6IHRvYXN0LlRZUEUuU1VDQ0VTUyxcbiAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgcmVuZGVyOiAoXG4gICAgICAgICAgPFRyYW5zYWN0aW9uVG9hc3RcbiAgICAgICAgICAgIHRpdGxlPVwiQXBwcm92ZSBzdWNjZXNzZnVsbFwiXG4gICAgICAgICAgICB0cmFuc2FjdGlvbklkPXt0cmFuc2FjdGlvbklkfVxuICAgICAgICAgIC8+XG4gICAgICAgICksXG4gICAgICAgIGF1dG9DbG9zZTogOTAwMCxcbiAgICAgICAgcGF1c2VPbkhvdmVyOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihcIlRyYW5zZmVyIGVycm9yXCIsIGUpO1xuICAgICAgdG9hc3QudXBkYXRlKHRvYXN0SWQsIHtcbiAgICAgICAgdHlwZTogdG9hc3QuVFlQRS5FUlJPUixcbiAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgY2xvc2VPbkNsaWNrOiB0cnVlLFxuXG4gICAgICAgIHJlbmRlcjogKFxuICAgICAgICAgIDxUcmFuc2FjdGlvbkZhaWxlZCB0aXRsZT1cIkFwcHJvdmUgZmFpbGVkXCIgbWVzc2FnZT17ZS5tZXNzYWdlfSAvPlxuICAgICAgICApLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxCdXR0b24gb25DbGljaz17b25PcGVufSBpc0Rpc2FibGVkPXshbWV0YS50cmFuc2ZlcmFibGV9PlxuICAgICAgICBBcHByb3ZlXG4gICAgICA8L0J1dHRvbj5cblxuICAgICAgPE1vZGFsXG4gICAgICAgIGluaXRpYWxGb2N1c1JlZj17aW5pdGlhbFJlZn1cbiAgICAgICAgb25DbG9zZT17b25DbG9zZX1cbiAgICAgICAgaXNPcGVuPXtpc09wZW59XG4gICAgICAgIGlzQ2VudGVyZWRcbiAgICAgICAgc2l6ZT17XCJ4bFwifVxuICAgICAgICBwcmVzZXJ2ZVNjcm9sbEJhckdhcD17dHJ1ZX1cbiAgICAgID5cbiAgICAgICAgPE1vZGFsT3ZlcmxheSAvPlxuICAgICAgICA8TW9kYWxDb250ZW50PlxuICAgICAgICAgIDxNb2RhbEhlYWRlcj5BcHByb3ZlPC9Nb2RhbEhlYWRlcj5cbiAgICAgICAgICA8TW9kYWxDbG9zZUJ1dHRvbiAvPlxuICAgICAgICAgIDxNb2RhbEJvZHk+XG4gICAgICAgICAgICA8VGV4dCBtYj17Mn0+XG4gICAgICAgICAgICAgIFRoaXMgd2lsbCBhbGxvdyBhIHByaW5jaXBhbCB0byB0cmFuc2Zlciwgc29ja2V0LCB1bnNvY2tldCBhbmQgdXNlXG4gICAgICAgICAgICAgIHRoaXMgTkZULiBTZXR0aW5nIG9uZSBjbGVhcnMgdGhlIHByZXZpb3VzLlxuICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgPEZvcm1Db250cm9sPlxuICAgICAgICAgICAgICA8Rm9ybUxhYmVsPlByaW5jaXBhbDwvRm9ybUxhYmVsPlxuICAgICAgICAgICAgICA8SW5wdXQgcmVmPXtpbml0aWFsUmVmfSBwbGFjZWhvbGRlcj1cImFhYWFhLWFhLi4uXCIgLz5cbiAgICAgICAgICAgIDwvRm9ybUNvbnRyb2w+XG4gICAgICAgICAgPC9Nb2RhbEJvZHk+XG4gICAgICAgICAgPE1vZGFsRm9vdGVyPlxuICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtvbkNsb3NlfT5DYW5jZWw8L0J1dHRvbj5cbiAgICAgICAgICAgIDxCdXR0b24gbWw9ezN9IG9uQ2xpY2s9e2FwcHJvdmVPa30+XG4gICAgICAgICAgICAgIEFwcHJvdmVcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvTW9kYWxGb290ZXI+XG4gICAgICAgIDwvTW9kYWxDb250ZW50PlxuICAgICAgPC9Nb2RhbD5cbiAgICA8Lz5cbiAgKTtcbn1cblxuZnVuY3Rpb24gVW5zb2NrZXRCdXR0b24oeyBpZCB9KSB7XG4gIGNvbnN0IHsgaXNPcGVuLCBvbk9wZW4sIG9uQ2xvc2UgfSA9IHVzZURpc2Nsb3N1cmUoKTtcbiAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuICBjb25zdCBpbml0aWFsUmVmID0gUmVhY3QudXNlUmVmKCk7XG5cbiAgY29uc3QgdHJhbnNmZXJPayA9IGFzeW5jICgpID0+IHtcbiAgICBsZXQgcGx1Z19pZCA9IGluaXRpYWxSZWYuY3VycmVudC52YWx1ZTtcbiAgICBvbkNsb3NlKCk7XG4gICAgbGV0IHRvYXN0SWQgPSB0b2FzdChcIlVucGx1Z2dpbmcuLi5cIiwge1xuICAgICAgdHlwZTogdG9hc3QuVFlQRS5JTkZPLFxuICAgICAgcG9zaXRpb246IFwiYm90dG9tLXJpZ2h0XCIsXG4gICAgICBhdXRvQ2xvc2U6IGZhbHNlLFxuICAgICAgaGlkZVByb2dyZXNzQmFyOiBmYWxzZSxcbiAgICAgIGNsb3NlT25DbGljazogZmFsc2UsXG4gICAgICBwYXVzZU9uSG92ZXI6IHRydWUsXG4gICAgICBkcmFnZ2FibGU6IGZhbHNlLFxuICAgIH0pO1xuICAgIHRyeSB7XG4gICAgICBsZXQgeyB0cmFuc2FjdGlvbklkIH0gPSBhd2FpdCBkaXNwYXRjaChcbiAgICAgICAgbmZ0X3Vuc29ja2V0KHsgc29ja2V0X2lkOiBpZCwgcGx1Z19pZCB9KVxuICAgICAgKTtcblxuICAgICAgdG9hc3QudXBkYXRlKHRvYXN0SWQsIHtcbiAgICAgICAgdHlwZTogdG9hc3QuVFlQRS5TVUNDRVNTLFxuICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICByZW5kZXI6IChcbiAgICAgICAgICA8VHJhbnNhY3Rpb25Ub2FzdFxuICAgICAgICAgICAgdGl0bGU9XCJVbnBsdWdnaW5nIHN1Y2Nlc3NmdWxsXCJcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uSWQ9e3RyYW5zYWN0aW9uSWR9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSxcbiAgICAgICAgYXV0b0Nsb3NlOiA5MDAwLFxuICAgICAgICBwYXVzZU9uSG92ZXI6IHRydWUsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiVW5wbHVnZ2luZyBlcnJvclwiLCBlKTtcbiAgICAgIHRvYXN0LnVwZGF0ZSh0b2FzdElkLCB7XG4gICAgICAgIHR5cGU6IHRvYXN0LlRZUEUuRVJST1IsXG4gICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgIGNsb3NlT25DbGljazogdHJ1ZSxcblxuICAgICAgICByZW5kZXI6IChcbiAgICAgICAgICA8VHJhbnNhY3Rpb25GYWlsZWQgdGl0bGU9XCJVbnBsdWdnaW5nIGZhaWxlZFwiIG1lc3NhZ2U9e2UubWVzc2FnZX0gLz5cbiAgICAgICAgKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtvbk9wZW59PlVucGx1ZzwvQnV0dG9uPlxuXG4gICAgICA8TW9kYWxcbiAgICAgICAgaW5pdGlhbEZvY3VzUmVmPXtpbml0aWFsUmVmfVxuICAgICAgICBvbkNsb3NlPXtvbkNsb3NlfVxuICAgICAgICBpc09wZW49e2lzT3Blbn1cbiAgICAgICAgaXNDZW50ZXJlZFxuICAgICAgICBzaXplPXtcInhsXCJ9XG4gICAgICAgIHByZXNlcnZlU2Nyb2xsQmFyR2FwPXt0cnVlfVxuICAgICAgPlxuICAgICAgICA8TW9kYWxPdmVybGF5IC8+XG4gICAgICAgIDxNb2RhbENvbnRlbnQ+XG4gICAgICAgICAgPE1vZGFsSGVhZGVyPlVucGx1ZyBORlQgZnJvbSBzb2NrZXQ8L01vZGFsSGVhZGVyPlxuICAgICAgICAgIDxNb2RhbENsb3NlQnV0dG9uIC8+XG4gICAgICAgICAgPE1vZGFsQm9keT5cbiAgICAgICAgICAgIDxGb3JtQ29udHJvbD5cbiAgICAgICAgICAgICAgPEZvcm1MYWJlbD5UYXJnZXQgcGx1ZyB0b2tlbiBpZGVudGlmaWVyPC9Gb3JtTGFiZWw+XG4gICAgICAgICAgICAgIDxJbnB1dCByZWY9e2luaXRpYWxSZWZ9IHBsYWNlaG9sZGVyPVwiTkZUQTI5U0wuLi5cIiAvPlxuICAgICAgICAgICAgPC9Gb3JtQ29udHJvbD5cbiAgICAgICAgICA8L01vZGFsQm9keT5cbiAgICAgICAgICA8TW9kYWxGb290ZXI+XG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e29uQ2xvc2V9PkNhbmNlbDwvQnV0dG9uPlxuICAgICAgICAgICAgPEJ1dHRvbiBtbD17M30gb25DbGljaz17dHJhbnNmZXJPa30+XG4gICAgICAgICAgICAgIFVucGx1Z1xuICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPC9Nb2RhbEZvb3Rlcj5cbiAgICAgICAgPC9Nb2RhbENvbnRlbnQ+XG4gICAgICA8L01vZGFsPlxuICAgIDwvPlxuICApO1xufVxuXG5mdW5jdGlvbiBTb2NrZXRCdXR0b24oeyBpZCB9KSB7XG4gIGNvbnN0IHsgaXNPcGVuLCBvbk9wZW4sIG9uQ2xvc2UgfSA9IHVzZURpc2Nsb3N1cmUoKTtcbiAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuICBjb25zdCBpbml0aWFsUmVmID0gUmVhY3QudXNlUmVmKCk7XG5cbiAgY29uc3QgdHJhbnNmZXJPayA9IGFzeW5jICgpID0+IHtcbiAgICBsZXQgc29ja2V0X2lkID0gaW5pdGlhbFJlZi5jdXJyZW50LnZhbHVlO1xuICAgIG9uQ2xvc2UoKTtcbiAgICBsZXQgdG9hc3RJZCA9IHRvYXN0KFwiUGx1Z2dpbmcuLi5cIiwge1xuICAgICAgdHlwZTogdG9hc3QuVFlQRS5JTkZPLFxuICAgICAgcG9zaXRpb246IFwiYm90dG9tLXJpZ2h0XCIsXG4gICAgICBhdXRvQ2xvc2U6IGZhbHNlLFxuICAgICAgaGlkZVByb2dyZXNzQmFyOiBmYWxzZSxcbiAgICAgIGNsb3NlT25DbGljazogZmFsc2UsXG4gICAgICBwYXVzZU9uSG92ZXI6IHRydWUsXG4gICAgICBkcmFnZ2FibGU6IGZhbHNlLFxuICAgIH0pO1xuICAgIHRyeSB7XG4gICAgICBsZXQgeyB0cmFuc2FjdGlvbklkIH0gPSBhd2FpdCBkaXNwYXRjaChcbiAgICAgICAgbmZ0X3BsdWcoeyBwbHVnX2lkOiBpZCwgc29ja2V0X2lkIH0pXG4gICAgICApO1xuXG4gICAgICB0b2FzdC51cGRhdGUodG9hc3RJZCwge1xuICAgICAgICB0eXBlOiB0b2FzdC5UWVBFLlNVQ0NFU1MsXG4gICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgIHJlbmRlcjogKFxuICAgICAgICAgIDxUcmFuc2FjdGlvblRvYXN0XG4gICAgICAgICAgICB0aXRsZT1cIlBsdWdnaW5nIHN1Y2Nlc3NmdWxsXCJcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uSWQ9e3RyYW5zYWN0aW9uSWR9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSxcbiAgICAgICAgYXV0b0Nsb3NlOiA5MDAwLFxuICAgICAgICBwYXVzZU9uSG92ZXI6IHRydWUsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiUGx1Z2dpbmcgZXJyb3JcIiwgZSk7XG4gICAgICB0b2FzdC51cGRhdGUodG9hc3RJZCwge1xuICAgICAgICB0eXBlOiB0b2FzdC5UWVBFLkVSUk9SLFxuICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICBjbG9zZU9uQ2xpY2s6IHRydWUsXG5cbiAgICAgICAgcmVuZGVyOiA8VHJhbnNhY3Rpb25GYWlsZWQgdGl0bGU9XCJTb2NrZXQgZmFpbGVkXCIgbWVzc2FnZT17ZS5tZXNzYWdlfSAvPixcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtvbk9wZW59PlBsdWc8L0J1dHRvbj5cblxuICAgICAgPE1vZGFsXG4gICAgICAgIGluaXRpYWxGb2N1c1JlZj17aW5pdGlhbFJlZn1cbiAgICAgICAgb25DbG9zZT17b25DbG9zZX1cbiAgICAgICAgaXNPcGVuPXtpc09wZW59XG4gICAgICAgIGlzQ2VudGVyZWRcbiAgICAgICAgc2l6ZT17XCJ4bFwifVxuICAgICAgICBwcmVzZXJ2ZVNjcm9sbEJhckdhcD17dHJ1ZX1cbiAgICAgID5cbiAgICAgICAgPE1vZGFsT3ZlcmxheSAvPlxuICAgICAgICA8TW9kYWxDb250ZW50PlxuICAgICAgICAgIDxNb2RhbEhlYWRlcj5QbHVnIE5GVCBpbnRvIHNvY2tldDwvTW9kYWxIZWFkZXI+XG4gICAgICAgICAgPE1vZGFsQ2xvc2VCdXR0b24gLz5cbiAgICAgICAgICA8TW9kYWxCb2R5PlxuICAgICAgICAgICAgPEZvcm1Db250cm9sPlxuICAgICAgICAgICAgICA8Rm9ybUxhYmVsPlRhcmdldCBzb2NrZXQgdG9rZW4gaWRlbnRpZmllcjwvRm9ybUxhYmVsPlxuICAgICAgICAgICAgICA8SW5wdXQgcmVmPXtpbml0aWFsUmVmfSBwbGFjZWhvbGRlcj1cIk5GVEEyOVNMLi4uXCIgLz5cbiAgICAgICAgICAgICAgPFRleHQgcD17MX0gbXQ9ezF9PlxuICAgICAgICAgICAgICAgIEJvdGggdGhlIHBsdWcgYW5kIHRoZSBzb2NrZXQgbmVlZCB0byBiZSBvd25lZCBieSB0aGUgc2FtZVxuICAgICAgICAgICAgICAgIGFjY291bnRcbiAgICAgICAgICAgICAgPC9UZXh0PlxuICAgICAgICAgICAgPC9Gb3JtQ29udHJvbD5cbiAgICAgICAgICA8L01vZGFsQm9keT5cbiAgICAgICAgICA8TW9kYWxGb290ZXI+XG4gICAgICAgICAgICA8QnV0dG9uIG9uQ2xpY2s9e29uQ2xvc2V9PkNhbmNlbDwvQnV0dG9uPlxuICAgICAgICAgICAgPEJ1dHRvbiBtbD17M30gb25DbGljaz17dHJhbnNmZXJPa30+XG4gICAgICAgICAgICAgIFBsdWdcbiAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgIDwvTW9kYWxGb290ZXI+XG4gICAgICAgIDwvTW9kYWxDb250ZW50PlxuICAgICAgPC9Nb2RhbD5cbiAgICA8Lz5cbiAgKTtcbn1cblxuZXhwb3J0IGNvbnN0IFVzZUJ1dHRvbiA9ICh7IGlkLCBtZXRhIH0pID0+IHtcbiAgY29uc3QgW2lzT3Blbiwgc2V0SXNPcGVuXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3Qgb25DbG9zZSA9ICgpID0+IHNldElzT3BlbihmYWxzZSk7XG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcblxuICBjb25zdCBjYW5jZWxSZWYgPSBSZWFjdC51c2VSZWYoKTtcblxuICBjb25zdCB1c2VPayA9IGFzeW5jICgpID0+IHtcbiAgICBvbkNsb3NlKCk7XG4gICAgbGV0IHRvYXN0SWQgPSB0b2FzdChcIlVzaW5nLi4uXCIsIHtcbiAgICAgIHR5cGU6IHRvYXN0LlRZUEUuSU5GTyxcbiAgICAgIHBvc2l0aW9uOiBcImJvdHRvbS1yaWdodFwiLFxuICAgICAgYXV0b0Nsb3NlOiBmYWxzZSxcbiAgICAgIGhpZGVQcm9ncmVzc0JhcjogZmFsc2UsXG4gICAgICBjbG9zZU9uQ2xpY2s6IGZhbHNlLFxuICAgICAgcGF1c2VPbkhvdmVyOiB0cnVlLFxuICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRyeSB7XG4gICAgICBsZXQgdXNlRGF0YSA9IHsgY29vbGRvd246IDIgfTtcbiAgICAgIGxldCBtZW1vID0gWzEyLCAxMCwgNSwgMCwgMCwgMSwgN107XG4gICAgICBsZXQgeyB0cmFuc2FjdGlvbklkIH0gPSBhd2FpdCBkaXNwYXRjaChcbiAgICAgICAgbmZ0X3VzZSh7IGlkLCB1c2U6IHVzZURhdGEsIG1lbW8gfSlcbiAgICAgICk7XG5cbiAgICAgIHRvYXN0LnVwZGF0ZSh0b2FzdElkLCB7XG4gICAgICAgIHR5cGU6IHRvYXN0LlRZUEUuU1VDQ0VTUyxcbiAgICAgICAgaXNMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgcmVuZGVyOiAoXG4gICAgICAgICAgPFRyYW5zYWN0aW9uVG9hc3RcbiAgICAgICAgICAgIHRpdGxlPVwiVXNlIHN1Y2Nlc3NmdWxsXCJcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uSWQ9e3RyYW5zYWN0aW9uSWR9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSxcbiAgICAgICAgYXV0b0Nsb3NlOiA5MDAwLFxuICAgICAgICBwYXVzZU9uSG92ZXI6IHRydWUsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsZXQgbXNnID0gXCJPbkNvb2xkb3duXCIgaW4gZSA/IFwiT24gY29vbGRvd25cIiA6IEpTT04uc3RyaW5naWZ5KGUpO1xuXG4gICAgICB0b2FzdC51cGRhdGUodG9hc3RJZCwge1xuICAgICAgICB0eXBlOiB0b2FzdC5UWVBFLkVSUk9SLFxuICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICBjbG9zZU9uQ2xpY2s6IHRydWUsXG5cbiAgICAgICAgcmVuZGVyOiAoXG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXY+VXNpbmcgZXJyb3IuPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiBcIjEwcHhcIiB9fT57bXNnfTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxCdXR0b24gb25DbGljaz17KCkgPT4gc2V0SXNPcGVuKHRydWUpfT5Vc2U8L0J1dHRvbj5cblxuICAgICAgPEFsZXJ0RGlhbG9nXG4gICAgICAgIGlzT3Blbj17aXNPcGVufVxuICAgICAgICBsZWFzdERlc3RydWN0aXZlUmVmPXtjYW5jZWxSZWZ9XG4gICAgICAgIG9uQ2xvc2U9e29uQ2xvc2V9XG4gICAgICAgIHByZXNlcnZlU2Nyb2xsQmFyR2FwPXt0cnVlfVxuICAgICAgPlxuICAgICAgICA8QWxlcnREaWFsb2dPdmVybGF5PlxuICAgICAgICAgIDxBbGVydERpYWxvZ0NvbnRlbnQ+XG4gICAgICAgICAgICA8QWxlcnREaWFsb2dIZWFkZXIgZm9udFNpemU9XCJsZ1wiIGZvbnRXZWlnaHQ9XCJib2xkXCI+XG4gICAgICAgICAgICAgIFVzZSBORlRcbiAgICAgICAgICAgIDwvQWxlcnREaWFsb2dIZWFkZXI+XG5cbiAgICAgICAgICAgIDxBbGVydERpYWxvZ0JvZHk+XG4gICAgICAgICAgICAgIFRoaXMgdXNlIGlzIGZvciBkZW1vIHB1cnBvc2VzLiBPbmNlIHVzZWQsIHRoZSBORlQgd2lsbCBoYXZlIDIgbWluXG4gICAgICAgICAgICAgIGNvb2xkb3duLlxuICAgICAgICAgICAgPC9BbGVydERpYWxvZ0JvZHk+XG5cbiAgICAgICAgICAgIDxBbGVydERpYWxvZ0Zvb3Rlcj5cbiAgICAgICAgICAgICAgPEJ1dHRvbiByZWY9e2NhbmNlbFJlZn0gb25DbGljaz17b25DbG9zZX0+XG4gICAgICAgICAgICAgICAgQ2FuY2VsXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICA8QnV0dG9uIGNvbG9yU2NoZW1lPVwicmVkXCIgb25DbGljaz17dXNlT2t9IG1sPXszfT5cbiAgICAgICAgICAgICAgICBVc2VcbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICA8L0FsZXJ0RGlhbG9nRm9vdGVyPlxuICAgICAgICAgIDwvQWxlcnREaWFsb2dDb250ZW50PlxuICAgICAgICA8L0FsZXJ0RGlhbG9nT3ZlcmxheT5cbiAgICAgIDwvQWxlcnREaWFsb2c+XG4gICAgPC8+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgVHJhbnNmZXJMaW5rQnV0dG9uID0gKHsgaWQsIG1ldGEgfSkgPT4ge1xuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbY3JlYXRpbmdMaW5rLCBzZXRDcmVhdGVMaW5rXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBvbkNsb3NlID0gKCkgPT4gc2V0SXNPcGVuKGZhbHNlKTtcbiAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuXG4gIGNvbnN0IGNhbmNlbFJlZiA9IFJlYWN0LnVzZVJlZigpO1xuXG4gIGNvbnN0IHRyYW5zZmVyT2sgPSBhc3luYyAoKSA9PiB7XG4gICAgc2V0Q3JlYXRlTGluayh0cnVlKTtcbiAgICBsZXQgY29kZSA9IGF3YWl0IGRpc3BhdGNoKG5mdF90cmFuc2Zlcl9saW5rKHsgaWQgfSkpO1xuICAgIHNldENyZWF0ZUxpbmsoZmFsc2UpO1xuXG4gICAgc2V0TGluayhcImh0dHBzOi8vbmZ0YW52aWwuY29tL1wiICsgY29kZSk7XG4gIH07XG5cbiAgY29uc3QgW2xpbmssIHNldExpbmtdID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxCdXR0b24gb25DbGljaz17KCkgPT4gc2V0SXNPcGVuKHRydWUpfSBpc0Rpc2FibGVkPXshbWV0YS50cmFuc2ZlcmFibGV9PlxuICAgICAgICBHaWZ0XG4gICAgICA8L0J1dHRvbj5cblxuICAgICAgPEFsZXJ0RGlhbG9nXG4gICAgICAgIGlzT3Blbj17aXNPcGVufVxuICAgICAgICBsZWFzdERlc3RydWN0aXZlUmVmPXtjYW5jZWxSZWZ9XG4gICAgICAgIG9uQ2xvc2U9e29uQ2xvc2V9XG4gICAgICAgIHByZXNlcnZlU2Nyb2xsQmFyR2FwPXt0cnVlfVxuICAgICAgPlxuICAgICAgICA8QWxlcnREaWFsb2dPdmVybGF5PlxuICAgICAgICAgIDxBbGVydERpYWxvZ0NvbnRlbnQ+XG4gICAgICAgICAgICB7IWxpbmsgPyAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgPEFsZXJ0RGlhbG9nSGVhZGVyIGZvbnRTaXplPVwibGdcIiBmb250V2VpZ2h0PVwiYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgQ3JlYXRlIGdpZnQgY29kZVxuICAgICAgICAgICAgICAgIDwvQWxlcnREaWFsb2dIZWFkZXI+XG5cbiAgICAgICAgICAgICAgICA8QWxlcnREaWFsb2dCb2R5PlxuICAgICAgICAgICAgICAgICAgQXJlIHlvdSBzdXJlPyBBbnlvbmUgd2l0aCB0aGUgY29kZS9saW5rIHdpbGwgYmUgYWJsZSB0byB0YWtlXG4gICAgICAgICAgICAgICAgICB0aGUgTkZUIGZyb20geW91LlxuICAgICAgICAgICAgICAgIDwvQWxlcnREaWFsb2dCb2R5PlxuXG4gICAgICAgICAgICAgICAgPEFsZXJ0RGlhbG9nRm9vdGVyPlxuICAgICAgICAgICAgICAgICAgeyFjcmVhdGluZ0xpbmsgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b24gcmVmPXtjYW5jZWxSZWZ9IG9uQ2xpY2s9e29uQ2xvc2V9PlxuICAgICAgICAgICAgICAgICAgICAgIENhbmNlbFxuICAgICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBpc0xvYWRpbmc9e2NyZWF0aW5nTGlua31cbiAgICAgICAgICAgICAgICAgICAgY29sb3JTY2hlbWU9XCJyZWRcIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0cmFuc2Zlck9rfVxuICAgICAgICAgICAgICAgICAgICBtbD17M31cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgQ3JlYXRlIGxpbmtcbiAgICAgICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvQWxlcnREaWFsb2dGb290ZXI+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8QWxlcnREaWFsb2dIZWFkZXIgZm9udFNpemU9XCJsZ1wiIGZvbnRXZWlnaHQ9XCJib2xkXCI+XG4gICAgICAgICAgICAgICAgICBMaW5rIHRvIGNsYWltIE5GVFxuICAgICAgICAgICAgICAgIDwvQWxlcnREaWFsb2dIZWFkZXI+XG5cbiAgICAgICAgICAgICAgICA8QWxlcnREaWFsb2dCb2R5PntsaW5rfTwvQWxlcnREaWFsb2dCb2R5PlxuXG4gICAgICAgICAgICAgICAgPEFsZXJ0RGlhbG9nRm9vdGVyPlxuICAgICAgICAgICAgICAgICAgPEJ1dHRvbiBvbkNsaWNrPXtvbkNsb3NlfSBtbD17M30+XG4gICAgICAgICAgICAgICAgICAgIE9rXG4gICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L0FsZXJ0RGlhbG9nRm9vdGVyPlxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9BbGVydERpYWxvZ0NvbnRlbnQ+XG4gICAgICAgIDwvQWxlcnREaWFsb2dPdmVybGF5PlxuICAgICAgPC9BbGVydERpYWxvZz5cbiAgICA8Lz5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBCdXlCdXR0b24gPSAoeyBpZCwgbWV0YSB9KSA9PiB7XG4gIGNvbnN0IFtpc09wZW4sIHNldElzT3Blbl0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IG9uQ2xvc2UgPSAoKSA9PiBzZXRJc09wZW4oZmFsc2UpO1xuICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XG5cbiAgY29uc3QgY2FuY2VsUmVmID0gUmVhY3QudXNlUmVmKCk7XG5cbiAgbGV0IGFtb3VudCA9IEJpZ0ludChtZXRhLnByaWNlLmFtb3VudCk7XG5cbiAgY29uc3QgYnV5T2sgPSAoKSA9PiB7XG4gICAgb25DbG9zZSgpO1xuICAgIGRpc3BhdGNoKG5mdF9wdXJjaGFzZSh7IGlkLCBhbW91bnQgfSkpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxCdXR0b25cbiAgICAgICAgb25DbGljaz17YXN5bmMgKCkgPT4ge1xuICAgICAgICAgIHNldElzT3Blbih0cnVlKTtcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgQnV5XG4gICAgICA8L0J1dHRvbj5cblxuICAgICAgPEFsZXJ0RGlhbG9nXG4gICAgICAgIGlzT3Blbj17aXNPcGVufVxuICAgICAgICBsZWFzdERlc3RydWN0aXZlUmVmPXtjYW5jZWxSZWZ9XG4gICAgICAgIG9uQ2xvc2U9e29uQ2xvc2V9XG4gICAgICAgIHByZXNlcnZlU2Nyb2xsQmFyR2FwPXt0cnVlfVxuICAgICAgPlxuICAgICAgICA8QWxlcnREaWFsb2dPdmVybGF5PlxuICAgICAgICAgIDxBbGVydERpYWxvZ0NvbnRlbnQ+XG4gICAgICAgICAgICA8QWxlcnREaWFsb2dIZWFkZXIgZm9udFNpemU9XCJsZ1wiIGZvbnRXZWlnaHQ9XCJib2xkXCI+XG4gICAgICAgICAgICAgIEJ1eSBORlRcbiAgICAgICAgICAgIDwvQWxlcnREaWFsb2dIZWFkZXI+XG5cbiAgICAgICAgICAgIDxBbGVydERpYWxvZ0JvZHk+XG4gICAgICAgICAgICAgIEJ1eSBmb3Ige0FjY291bnRJZGVudGlmaWVyLmU4c1RvSWNwKGFtb3VudCl9IElDUCA/XG4gICAgICAgICAgICAgIDxUZXh0IGZvbnRTaXplPVwiMTJweFwiIG10PVwiMlwiPlxuICAgICAgICAgICAgICAgIFRoZSBwcmljZSBpbmNsdWRlcyBmdWxsIHJlY2hhcmdlXG4gICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgICAgPFRleHQgZm9udFNpemU9XCIxNHB4XCIgZm9udFdlaWdodD17XCJib2xkXCJ9IG10PVwiMlwiPlxuICAgICAgICAgICAgICAgIFBsZWFzZSBtYWtlIHN1cmUgdGhlIHNlbGxlciBvciB0aGUgYXV0aG9yIGFyZSByZXB1dGFibGUgYW5kXG4gICAgICAgICAgICAgICAga25vd24gdG8geW91LiBJZiB0aGUgTkZUIGhhcyBkb21haW4gdmVyaWZpY2F0aW9uLCBtYWtlIHN1cmUgeW91XG4gICAgICAgICAgICAgICAgdHJ1c3QgaXRzIGRvbWFpbi4gU29tZW9uZSBjb3VsZCBoYXZlIG1pbnRlZCBhcnR3b3JrIGRvd25sb2FkZWRcbiAgICAgICAgICAgICAgICBmcm9tIHRoZSBJbnRlcm5ldCB3aXRob3V0IHRoZSByaWdodHMgdG8gZG8gc28uIEJlaW5nIGRpc3BsYXllZFxuICAgICAgICAgICAgICAgIGhlcmUgZG9lc24ndCBtYWtlIGl0IGxlZ2l0aW1hdGUuXG4gICAgICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgICAgIDwvQWxlcnREaWFsb2dCb2R5PlxuXG4gICAgICAgICAgICA8QWxlcnREaWFsb2dGb290ZXI+XG4gICAgICAgICAgICAgIDxCdXR0b24gcmVmPXtjYW5jZWxSZWZ9IG9uQ2xpY2s9e29uQ2xvc2V9PlxuICAgICAgICAgICAgICAgIENhbmNlbFxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgPEJ1dHRvbiBjb2xvclNjaGVtZT1cInJlZFwiIG9uQ2xpY2s9e2J1eU9rfSBtbD17M30+XG4gICAgICAgICAgICAgICAgQnV5LiBJIHVuZGVyc3RhbmQgdGhlIHJpc2tzXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9BbGVydERpYWxvZ0Zvb3Rlcj5cbiAgICAgICAgICA8L0FsZXJ0RGlhbG9nQ29udGVudD5cbiAgICAgICAgPC9BbGVydERpYWxvZ092ZXJsYXk+XG4gICAgICA8L0FsZXJ0RGlhbG9nPlxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IEJ1cm5CdXR0b24gPSAoeyBpZCB9KSA9PiB7XG4gIGNvbnN0IFtpc09wZW4sIHNldElzT3Blbl0gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IG9uQ2xvc2UgPSAoKSA9PiBzZXRJc09wZW4oZmFsc2UpO1xuICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XG5cbiAgY29uc3QgY2FuY2VsUmVmID0gUmVhY3QudXNlUmVmKCk7XG5cbiAgY29uc3QgYnVybk9rID0gYXN5bmMgKCkgPT4ge1xuICAgIG9uQ2xvc2UoKTtcblxuICAgIGxldCB0b2FzdElkID0gdG9hc3QoXCJCdXJuaW5nLi4uXCIsIHtcbiAgICAgIHR5cGU6IHRvYXN0LlRZUEUuSU5GTyxcbiAgICAgIHBvc2l0aW9uOiBcImJvdHRvbS1yaWdodFwiLFxuICAgICAgYXV0b0Nsb3NlOiBmYWxzZSxcbiAgICAgIGhpZGVQcm9ncmVzc0JhcjogZmFsc2UsXG4gICAgICBjbG9zZU9uQ2xpY2s6IGZhbHNlLFxuICAgICAgcGF1c2VPbkhvdmVyOiB0cnVlLFxuICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIHRyeSB7XG4gICAgICBsZXQgeyB0cmFuc2FjdGlvbklkIH0gPSBhd2FpdCBkaXNwYXRjaChuZnRfYnVybih7IGlkIH0pKTtcblxuICAgICAgdG9hc3QudXBkYXRlKHRvYXN0SWQsIHtcbiAgICAgICAgdHlwZTogdG9hc3QuVFlQRS5TVUNDRVNTLFxuICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICByZW5kZXI6IChcbiAgICAgICAgICA8VHJhbnNhY3Rpb25Ub2FzdFxuICAgICAgICAgICAgdGl0bGU9XCJCdXJuaW5nIHN1Y2Nlc3NmdWxsXCJcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uSWQ9e3RyYW5zYWN0aW9uSWR9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSxcbiAgICAgICAgYXV0b0Nsb3NlOiA5MDAwLFxuICAgICAgICBwYXVzZU9uSG92ZXI6IHRydWUsXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICB0b2FzdC51cGRhdGUodG9hc3RJZCwge1xuICAgICAgICB0eXBlOiB0b2FzdC5UWVBFLkVSUk9SLFxuICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICBjbG9zZU9uQ2xpY2s6IHRydWUsXG5cbiAgICAgICAgcmVuZGVyOiAoXG4gICAgICAgICAgPFRyYW5zYWN0aW9uRmFpbGVkIHRpdGxlPVwiQnVybmluZyBmYWlsZWRcIiBtZXNzYWdlPXtlLm1lc3NhZ2V9IC8+XG4gICAgICAgICksXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxCdXR0b24gb25DbGljaz17KCkgPT4gc2V0SXNPcGVuKHRydWUpfT5CdXJuPC9CdXR0b24+XG5cbiAgICAgIDxBbGVydERpYWxvZ1xuICAgICAgICBpc09wZW49e2lzT3Blbn1cbiAgICAgICAgbGVhc3REZXN0cnVjdGl2ZVJlZj17Y2FuY2VsUmVmfVxuICAgICAgICBvbkNsb3NlPXtvbkNsb3NlfVxuICAgICAgICBwcmVzZXJ2ZVNjcm9sbEJhckdhcD17dHJ1ZX1cbiAgICAgID5cbiAgICAgICAgPEFsZXJ0RGlhbG9nT3ZlcmxheT5cbiAgICAgICAgICA8QWxlcnREaWFsb2dDb250ZW50PlxuICAgICAgICAgICAgPEFsZXJ0RGlhbG9nSGVhZGVyIGZvbnRTaXplPVwibGdcIiBmb250V2VpZ2h0PVwiYm9sZFwiPlxuICAgICAgICAgICAgICBCdXJuIE5GVFxuICAgICAgICAgICAgPC9BbGVydERpYWxvZ0hlYWRlcj5cblxuICAgICAgICAgICAgPEFsZXJ0RGlhbG9nQm9keT5cbiAgICAgICAgICAgICAgQXJlIHlvdSBzdXJlPyBUaGlzIHdpbGwgZGVzdHJveSB0aGUgTkZUIGNvbXBsZXRlbHkuIFlvdSBjYW4ndCB1bmRvXG4gICAgICAgICAgICAgIHRoaXMgYWN0aW9uIGFmdGVyd2FyZHMuXG4gICAgICAgICAgICA8L0FsZXJ0RGlhbG9nQm9keT5cblxuICAgICAgICAgICAgPEFsZXJ0RGlhbG9nRm9vdGVyPlxuICAgICAgICAgICAgICA8QnV0dG9uIHJlZj17Y2FuY2VsUmVmfSBvbkNsaWNrPXtvbkNsb3NlfT5cbiAgICAgICAgICAgICAgICBDYW5jZWxcbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgIDxCdXR0b24gY29sb3JTY2hlbWU9XCJyZWRcIiBvbkNsaWNrPXtidXJuT2t9IG1sPXszfT5cbiAgICAgICAgICAgICAgICBCdXJuXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9BbGVydERpYWxvZ0Zvb3Rlcj5cbiAgICAgICAgICA8L0FsZXJ0RGlhbG9nQ29udGVudD5cbiAgICAgICAgPC9BbGVydERpYWxvZ092ZXJsYXk+XG4gICAgICA8L0FsZXJ0RGlhbG9nPlxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IFJlY2hhcmdlQnV0dG9uID0gKHsgaWQsIG1ldGEgfSkgPT4ge1xuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcmVjaGFyZ2VDb3N0LCBzZXRSZWNoYXJnZUNvc3RdID0gUmVhY3QudXNlU3RhdGUoMCk7XG5cbiAgY29uc3Qgb25DbG9zZSA9ICgpID0+IHNldElzT3BlbihmYWxzZSk7XG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcblxuICBjb25zdCBjYW5jZWxSZWYgPSBSZWFjdC51c2VSZWYoKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGRpc3BhdGNoKG5mdF9yZWNoYXJnZV9xdW90ZSh7IGlkIH0pKS50aGVuKChyZSkgPT4ge1xuICAgICAgc2V0UmVjaGFyZ2VDb3N0KHJlKTtcbiAgICB9KTtcbiAgfSwgW2lkLCBtZXRhLCBkaXNwYXRjaF0pO1xuXG4gIGNvbnN0IHJlY2hhcmdlT2sgPSBhc3luYyAoKSA9PiB7XG4gICAgb25DbG9zZSgpO1xuICAgIGRpc3BhdGNoKG5mdF9yZWNoYXJnZSh7IGlkLCBhbW91bnQ6IHJlY2hhcmdlQ29zdCB9KSk7XG4gIH07XG5cbiAgaWYgKCFyZWNoYXJnZUNvc3QpIHJldHVybiBudWxsO1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8QnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldElzT3Blbih0cnVlKX0+XG4gICAgICAgIDxUZXh0IG1yPVwiMlwiPlJlY2hhcmdlIGZvciA8L1RleHQ+XG4gICAgICAgIDxJQ1A+e3JlY2hhcmdlQ29zdH08L0lDUD5cbiAgICAgIDwvQnV0dG9uPlxuXG4gICAgICA8QWxlcnREaWFsb2dcbiAgICAgICAgaXNPcGVuPXtpc09wZW59XG4gICAgICAgIGxlYXN0RGVzdHJ1Y3RpdmVSZWY9e2NhbmNlbFJlZn1cbiAgICAgICAgb25DbG9zZT17b25DbG9zZX1cbiAgICAgICAgcHJlc2VydmVTY3JvbGxCYXJHYXA9e3RydWV9XG4gICAgICA+XG4gICAgICAgIDxBbGVydERpYWxvZ092ZXJsYXk+XG4gICAgICAgICAgPEFsZXJ0RGlhbG9nQ29udGVudD5cbiAgICAgICAgICAgIDxBbGVydERpYWxvZ0hlYWRlciBmb250U2l6ZT1cImxnXCIgZm9udFdlaWdodD1cImJvbGRcIj5cbiAgICAgICAgICAgICAgUmVjaGFyZ2UgTkZUXG4gICAgICAgICAgICA8L0FsZXJ0RGlhbG9nSGVhZGVyPlxuXG4gICAgICAgICAgICA8QWxlcnREaWFsb2dCb2R5PlxuICAgICAgICAgICAgICBBcmUgeW91IHN1cmU/IFRoaXMgd2lsbCB0YWtlIDxJQ1A+e3JlY2hhcmdlQ29zdH08L0lDUD4gZnJvbSB5b3VyXG4gICAgICAgICAgICAgIGJhbGFuY2UgYW5kIHB1dCBpdCBpbiB0aGUgTkZUXG4gICAgICAgICAgICA8L0FsZXJ0RGlhbG9nQm9keT5cblxuICAgICAgICAgICAgPEFsZXJ0RGlhbG9nRm9vdGVyPlxuICAgICAgICAgICAgICA8QnV0dG9uIHJlZj17Y2FuY2VsUmVmfSBvbkNsaWNrPXtvbkNsb3NlfT5cbiAgICAgICAgICAgICAgICBDYW5jZWxcbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgIDxCdXR0b24gY29sb3JTY2hlbWU9XCJibHVlXCIgb25DbGljaz17cmVjaGFyZ2VPa30gbWw9ezN9PlxuICAgICAgICAgICAgICAgIFJlY2hhcmdlXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9BbGVydERpYWxvZ0Zvb3Rlcj5cbiAgICAgICAgICA8L0FsZXJ0RGlhbG9nQ29udGVudD5cbiAgICAgICAgPC9BbGVydERpYWxvZ092ZXJsYXk+XG4gICAgICA8L0FsZXJ0RGlhbG9nPlxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IE5GVFBvcG92ZXIgPSAoeyBtZXRhIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8U3RhY2s+XG4gICAgICB7LyogPENlbnRlcj5cbiAgICAgICAgPE5GVENvbnRlbnQgbWV0YT17bWV0YX0gLz5cbiAgICAgIDwvQ2VudGVyPiAqL31cbiAgICAgIDxDZW50ZXI+XG4gICAgICAgIDxORlRJbmZvIG1ldGE9e21ldGF9IC8+XG4gICAgICA8L0NlbnRlcj5cbiAgICA8L1N0YWNrPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IE5GVExhcmdlID0gKHsgaWQgfSkgPT4ge1xuICBjb25zdCBtZXRhID0gdXNlU2VsZWN0b3IoKHN0YXRlKSA9PiBzdGF0ZS5uZnRbaWRdKTtcblxuICBjb25zdCBtb2RlID0gdXNlQ29sb3JNb2RlVmFsdWUoXCJsaWdodFwiLCBcImRhcmtcIik7XG5cbiAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZGlzcGF0Y2gobmZ0X2ZldGNoKGlkKSk7XG4gIH0sIFtpZCwgZGlzcGF0Y2hdKTtcblxuICBpZiAoIW1ldGEpIHJldHVybiBudWxsO1xuXG4gIHJldHVybiAoXG4gICAgPFRodW1iTGFyZ2UgbW9kZT17bW9kZX0+XG4gICAgICB7bWV0YS50aHVtYj8uaXBmcz8udXJsID8gKFxuICAgICAgICA8aW1nIGFsdD1cIlwiIGNsYXNzTmFtZT1cImN1c3RvbVwiIHNyYz17bWV0YS50aHVtYi5pcGZzLnVybH0gLz5cbiAgICAgICkgOiBtZXRhLnRodW1iPy5pbnRlcm5hbD8udXJsID8gKFxuICAgICAgICA8aW1nIGFsdD1cIlwiIGNsYXNzTmFtZT1cImN1c3RvbVwiIHNyYz17bWV0YS50aHVtYi5pbnRlcm5hbC51cmx9IC8+XG4gICAgICApIDogbWV0YS50aHVtYj8uZXh0ZXJuYWwgPyAoXG4gICAgICAgIDxpbWcgYWx0PVwiXCIgY2xhc3NOYW1lPVwiY3VzdG9tXCIgc3JjPXttZXRhLnRodW1iPy5leHRlcm5hbH0gLz5cbiAgICAgICkgOiAoXG4gICAgICAgIFwiXCJcbiAgICAgICl9XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5mb1wiPlxuICAgICAgICB7bWV0YS5kb21haW4gPyAoXG4gICAgICAgICAgbWV0YS5kb21haW4uaW5kZXhPZihcInR3aXR0ZXIuY29tL1wiKSAhPT0gLTEgPyAoXG4gICAgICAgICAgICA8TWV0YURvbWFpblR3aXR0ZXIga2V5PXtcImRvbWFpblwifSBtZXRhPXttZXRhfSBzaG93TGluaz17ZmFsc2V9IC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxNZXRhRG9tYWluIGtleT17XCJkb21haW5cIn0gbWV0YT17bWV0YX0gc2hvd0xpbms9e2ZhbHNlfSAvPlxuICAgICAgICAgIClcbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHsvKiB7bWV0YS5kb21haW4gPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbGxlY3Rpb25cIj5cbiAgICAgICAgICAgICAgPE1ldGFEb21haW4gbWV0YT17bWV0YX0gc2hvd0xpbms9e2ZhbHNlfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IG51bGx9ICovfVxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYXV0aG9yXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsYWJlbFwiPkFVVEhPUjwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8QUNDIHNob3J0PXt0cnVlfT57bWV0YS5hdXRob3J9PC9BQ0M+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7bWV0YS5wcmljZS5hbW91bnQgJiYgbWV0YS5wcmljZS5hbW91bnQgIT09IFwiMFwiID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHJpY2VcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiZWxcIj5QUklDRTwvZGl2PlxuICAgICAgICAgICAgPElDUCBkaWdpdHM9ezJ9PnttZXRhLnByaWNlLmFtb3VudH08L0lDUD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICA8L1RodW1iTGFyZ2U+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgTkZUID0gKHsgaWQsIHRodW1iU2l6ZSB9KSA9PiB7XG4gIGNvbnN0IG1ldGEgPSB1c2VTZWxlY3Rvcigoc3RhdGUpID0+IHN0YXRlLm5mdFtpZF0pO1xuXG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcblxuICBjb25zdCBbcG9wb3Zlck9wZW4sIHNldFBvcG92ZXJdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgZGlzcGF0Y2gobmZ0X2ZldGNoKGlkKSk7XG4gIH0sIFtpZCwgZGlzcGF0Y2hdKTtcblxuICByZXR1cm4gKFxuICAgIDxUaHVtYlxuICAgICAgc3R5bGU9e3sgekluZGV4OiBwb3BvdmVyT3BlbiA/IDEwIDogMCB9fVxuICAgICAgb25Nb3VzZU92ZXI9eygpID0+IHtcbiAgICAgICAgc2V0UG9wb3Zlcih0cnVlKTtcbiAgICAgIH19XG4gICAgICBvbk1vdXNlT3V0PXsoKSA9PiB7XG4gICAgICAgIHNldFBvcG92ZXIoZmFsc2UpO1xuICAgICAgfX1cbiAgICA+XG4gICAgICB7bWV0YT8udGh1bWI/LmlwZnM/LnVybCA/IChcbiAgICAgICAgPGltZyBhbHQ9XCJcIiBjbGFzc05hbWU9XCJjdXN0b21cIiBzcmM9e21ldGEudGh1bWIuaXBmcy51cmx9IC8+XG4gICAgICApIDogbWV0YT8udGh1bWI/LmludGVybmFsPy51cmwgPyAoXG4gICAgICAgIDxpbWcgYWx0PVwiXCIgY2xhc3NOYW1lPVwiY3VzdG9tXCIgc3JjPXttZXRhLnRodW1iLmludGVybmFsLnVybH0gLz5cbiAgICAgICkgOiBtZXRhPy50aHVtYj8uZXh0ZXJuYWwgPyAoXG4gICAgICAgIDxpbWcgYWx0PVwiXCIgY2xhc3NOYW1lPVwiY3VzdG9tXCIgc3JjPXttZXRhLnRodW1iLmV4dGVybmFsfSAvPlxuICAgICAgKSA6IChcbiAgICAgICAgXCJcIlxuICAgICAgKX1cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyXCIgLz5cbiAgICAgIHtwb3BvdmVyT3BlbiA/IChcbiAgICAgICAgPEJveFxuICAgICAgICAgIHN4PXt7XG4gICAgICAgICAgICBwb2ludGVyRXZlbnRzOiBcIm5vbmVcIixcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICB0b3A6IFwiNTZweFwiLFxuICAgICAgICAgICAgbGVmdDogXCI1NnB4XCIsXG4gICAgICAgICAgICB3aWR0aDogXCI0MDBweFwiLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8TkZUUG9wb3ZlciBtZXRhPXttZXRhfSAvPlxuICAgICAgICA8L0JveD5cbiAgICAgICkgOiBudWxsfVxuICAgIDwvVGh1bWI+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgTkZUQ2xhaW0gPSAocCkgPT4ge1xuICBjb25zdCBjb2RlID0gcC5tYXRjaC5wYXJhbXMuY29kZTtcblxuICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBkaXNwYXRjaChuZnRfZW50ZXJfY29kZShjb2RlKSk7XG4gIH0sIFtjb2RlLCBkaXNwYXRjaF0pO1xuXG4gIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0IGNvbnN0IE5GVFBhZ2UgPSAocCkgPT4ge1xuICBjb25zdCBpZCA9IHAubWF0Y2gucGFyYW1zLmlkO1xuICBjb25zdCBjb2RlID0gcC5tYXRjaC5wYXJhbXMuY29kZTtcblxuICBjb25zdCBhZGRyZXNzID0gdXNlU2VsZWN0b3IoKHN0YXRlKSA9PiBzdGF0ZS51c2VyLmFkZHJlc3MpO1xuXG4gIGNvbnN0IG1ldGEgPSB1c2VTZWxlY3Rvcigoc3RhdGUpID0+IHN0YXRlLm5mdFtpZF0pO1xuICBjb25zdCBwcm8gPSB1c2VTZWxlY3Rvcigoc3RhdGUpID0+IHN0YXRlLnVzZXIucHJvKTtcblxuICBjb25zdCBbY2xhaW1lZCwgc2V0Q2xhaW1lZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbY2xhaW1pbmcsIHNldENsYWltaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBkaXNwYXRjaChuZnRfZmV0Y2goaWQpKTtcbiAgfSwgW2lkLCBkaXNwYXRjaF0pO1xuXG4gIGNvbnN0IG9uQ2xhaW0gPSBhc3luYyAoKSA9PiB7XG4gICAgc2V0Q2xhaW1pbmcodHJ1ZSk7XG4gICAgc2V0RXJyb3IoZmFsc2UpO1xuXG4gICAgbGV0IHJlc3AgPSBhd2FpdCBkaXNwYXRjaChuZnRfY2xhaW1fbGluayh7IGNvZGUgfSkpO1xuICAgIHNldENsYWltaW5nKGZhbHNlKTtcblxuICAgIGlmIChyZXNwLm9rICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHNldENsYWltZWQodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldEVycm9yKHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBpZiAoIW1ldGEpIHJldHVybiBudWxsO1xuICByZXR1cm4gKFxuICAgIDxTdGFjayBtbD17XCIxMHB4XCJ9IG1yPXtcIjEwcHhcIn0gbXQ9e1wiNHZoXCJ9PlxuICAgICAgPENlbnRlcj5cbiAgICAgICAgPE5GVENvbnRlbnQgbWV0YT17bWV0YX0gLz5cbiAgICAgIDwvQ2VudGVyPlxuICAgICAgPENlbnRlcj5cbiAgICAgICAgPFN0YWNrPlxuICAgICAgICAgIDxORlRUaHVtYiBtZXRhPXttZXRhfSAvPlxuICAgICAgICAgIDxORlRJbmZvIGlkPXtpZH0gbWV0YT17bWV0YX0gLz5cblxuICAgICAgICAgIHtwcm8gPyA8TkZUUHJvSW5mbyBpZD17aWR9IG1ldGE9e21ldGF9IC8+IDogbnVsbH1cbiAgICAgICAgPC9TdGFjaz5cbiAgICAgIDwvQ2VudGVyPlxuXG4gICAgICA8Q2VudGVyPlxuICAgICAgICA8TkZUTWVudVxuICAgICAgICAgIG5vYnV5PXshY2xhaW1lZCAmJiBjb2RlfVxuICAgICAgICAgIG93bmVyPXtcbiAgICAgICAgICAgIGFkZHJlc3MgJiYgYWRkcmVzcy50b1VwcGVyQ2FzZSgpID09PSBtZXRhPy5iZWFyZXI/LnRvVXBwZXJDYXNlKClcbiAgICAgICAgICB9XG4gICAgICAgICAgaWQ9e2lkfVxuICAgICAgICAgIG1ldGE9e21ldGF9XG4gICAgICAgIC8+XG4gICAgICA8L0NlbnRlcj5cblxuICAgICAge2NsYWltZWQgPyAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPENvbmZldHRpIC8+XG4gICAgICAgICAgPEFsZXJ0IHN0YXR1cz1cInN1Y2Nlc3NcIj5cbiAgICAgICAgICAgIDxBbGVydEljb24gLz5cbiAgICAgICAgICAgIDxBbGVydFRpdGxlIG1yPXsyfT5DbGFpbWluZyBzdWNlc3MhPC9BbGVydFRpdGxlPlxuICAgICAgICAgICAgPEFsZXJ0RGVzY3JpcHRpb24+XG4gICAgICAgICAgICAgIFRoZSBORlQgaXMgbm93IHlvdXJzLiBUaGlzIGxpbmsgY2FuJ3QgYmUgdXNlZCBhZ2Fpbi5cbiAgICAgICAgICAgIDwvQWxlcnREZXNjcmlwdGlvbj5cbiAgICAgICAgICA8L0FsZXJ0PlxuICAgICAgICA8Lz5cbiAgICAgICkgOiBudWxsfVxuICAgICAgeyFjbGFpbWVkICYmIGNvZGUgPyAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPENlbnRlcj5cbiAgICAgICAgICAgIDxMb2dpblJlcXVpcmVkIGxhYmVsPVwiQXV0aGVudGljYXRlIHRvIGNsYWltXCI+XG4gICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICBpc0xvYWRpbmc9e2NsYWltaW5nfVxuICAgICAgICAgICAgICAgIGxvYWRpbmdUZXh0PVwiQ2xhaW1pbmdcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xhaW19XG4gICAgICAgICAgICAgICAgY29sb3JTY2hlbWU9XCJ0ZWFsXCJcbiAgICAgICAgICAgICAgICBzaXplPVwibGdcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgQ2xhaW0gTkZUXG4gICAgICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICAgICAgPC9Mb2dpblJlcXVpcmVkPlxuICAgICAgICAgIDwvQ2VudGVyPlxuXG4gICAgICAgICAge2Vycm9yID8gKFxuICAgICAgICAgICAgPEFsZXJ0IHN0YXR1cz1cImVycm9yXCI+XG4gICAgICAgICAgICAgIDxBbGVydEljb24gLz5cbiAgICAgICAgICAgICAgPEFsZXJ0VGl0bGUgbXI9ezJ9PkNsYWltaW5nIGZhaWxlZCE8L0FsZXJ0VGl0bGU+XG4gICAgICAgICAgICAgIDxBbGVydERlc2NyaXB0aW9uPlxuICAgICAgICAgICAgICAgIFBlcmhhcHMgc29tZW9uZSBlbHNlIGNsYWltZWQgdGhpcyBjb2RlIGJlZm9yZSB5b3Ugb3IgaXQncyBub3RcbiAgICAgICAgICAgICAgICB2YWxpZFxuICAgICAgICAgICAgICA8L0FsZXJ0RGVzY3JpcHRpb24+XG4gICAgICAgICAgICA8L0FsZXJ0PlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICA8Lz5cbiAgICAgICkgOiBudWxsfVxuICAgICAge21ldGEuaGlzdG9yeSA/IChcbiAgICAgICAgPE5mdEhpc3RvcnkgdHJhbnNhY3Rpb25zPXttZXRhLmhpc3Rvcnl9IHNob3dUaHVtYj17ZmFsc2V9IC8+XG4gICAgICApIDogbnVsbH1cbiAgICA8L1N0YWNrPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IE5GVENvbnRlbnQgPSAocCkgPT4ge1xuICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XG5cbiAgLy9pZiAocC5tZXRhPy5jb250ZW50Py5leHRlcm5hbCkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgYyA9XG4gICAgcC5tZXRhPy5jb250ZW50Py5pbnRlcm5hbCB8fFxuICAgIHAubWV0YT8uY29udGVudD8uaXBmcyB8fFxuICAgIHAubWV0YT8uY29udGVudD8uZXh0ZXJuYWw7XG5cbiAgaWYgKCFjKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBjdHlwZSA9IGMuY29udGVudFR5cGVcbiAgICA/IGMuY29udGVudFR5cGUuaW5kZXhPZihcImltYWdlL1wiKSAhPT0gLTFcbiAgICAgID8gXCJpbWFnZVwiXG4gICAgICA6IGMuY29udGVudFR5cGUuaW5kZXhPZihcInZpZGVvL1wiKSAhPT0gLTFcbiAgICAgID8gXCJ2aWRlb1wiXG4gICAgICA6IFwidW5rbm93blwiXG4gICAgOiBcImltYWdlXCI7XG5cbiAgaWYgKGN0eXBlID09PSBcInVua25vd25cIikgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgdXJsID0gYy51cmwgfHwgYztcblxuICByZXR1cm4gKFxuICAgIDxDb250ZW50Qm94PlxuICAgICAge2N0eXBlID09PSBcImltYWdlXCIgJiYgdXJsID8gKFxuICAgICAgICA8aW1nIGNyb3NzT3JpZ2luPVwidHJ1ZVwiIHNyYz17dXJsfSBhbHQ9XCJcIiB3aWR0aD1cIjEwMCVcIiAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgICB7Y3R5cGUgPT09IFwidmlkZW9cIiAmJiB1cmwgPyAoXG4gICAgICAgIDx2aWRlbyBjb250cm9scyBsb29wIG11dGVkIGF1dG9QbGF5PlxuICAgICAgICAgIDxzb3VyY2Ugc3JjPXt1cmx9IHR5cGU9e2MuY29udGVudFR5cGV9IC8+XG4gICAgICAgIDwvdmlkZW8+XG4gICAgICApIDogbnVsbH1cbiAgICA8L0NvbnRlbnRCb3g+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgTkZUUHJldmlldyA9IChwKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFN0YWNrIHNwYWNpbmc9XCI1XCI+XG4gICAgICA8TkZUQ29udGVudCBtZXRhPXtwfSAvPlxuICAgICAgPE5GVEluZm8gbWV0YT17cH0gLz5cbiAgICAgIDxORlRUaHVtYiBtZXRhPXtwfSAvPlxuICAgICAgPE5GVFRodW1iTGFyZ2UgbWV0YT17cH0gLz5cbiAgICA8L1N0YWNrPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IE5GVFRodW1iID0gKHApID0+IHtcbiAgaWYgKHAubWV0YT8udGh1bWI/LmV4dGVybmFsKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBjID1cbiAgICBwLm1ldGE/LnRodW1iPy5pbnRlcm5hbCB8fCBwLm1ldGE/LnRodW1iPy5pcGZzIHx8IHAubWV0YT8udGh1bWI/LmV4dGVybmFsO1xuXG4gIGlmICghYykgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIChcbiAgICA8VGh1bWIgey4uLnB9PlxuICAgICAge2MudXJsID8gPGltZyBjbGFzc05hbWU9XCJjdXN0b21cIiBhbHQ9XCJcIiBzcmM9e2MudXJsfSAvPiA6IFwiXCJ9XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlclwiIC8+XG4gICAgPC9UaHVtYj5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBORlRUaHVtYkxhcmdlID0gKHApID0+IHtcbiAgY29uc3QgbW9kZSA9IHVzZUNvbG9yTW9kZVZhbHVlKFwibGlnaHRcIiwgXCJkYXJrXCIpO1xuICBpZiAocC5tZXRhPy50aHVtYj8uZXh0ZXJuYWwpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGMgPVxuICAgIHAubWV0YT8udGh1bWI/LmludGVybmFsIHx8IHAubWV0YT8udGh1bWI/LmlwZnMgfHwgcC5tZXRhPy50aHVtYj8uZXh0ZXJuYWw7XG5cbiAgaWYgKCFjKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4gKFxuICAgIDxUaHVtYkxhcmdlIHsuLi5wfSBzdHlsZT17eyBtYXJnaW5MZWZ0OiBcIjZweFwiIH19IG1vZGU9e21vZGV9PlxuICAgICAge2MudXJsID8gPGltZyBjbGFzc05hbWU9XCJjdXN0b21cIiBhbHQ9XCJcIiBzcmM9e2MudXJsfSAvPiA6IFwiXCJ9XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImluZm9cIj5cbiAgICAgICAge3AubWV0YS5kb21haW4gPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2xsZWN0aW9uXCI+XG4gICAgICAgICAgICB7cC5tZXRhLmRvbWFpbiA/IChcbiAgICAgICAgICAgICAgcC5tZXRhLmRvbWFpbi5pbmRleE9mKFwidHdpdHRlci5jb20vXCIpICE9PSAtMSA/IChcbiAgICAgICAgICAgICAgICA8TWV0YURvbWFpblR3aXR0ZXJcbiAgICAgICAgICAgICAgICAgIGtleT17XCJkb21haW5cIn1cbiAgICAgICAgICAgICAgICAgIG1ldGE9e3AubWV0YX1cbiAgICAgICAgICAgICAgICAgIHNob3dMaW5rPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDxNZXRhRG9tYWluIGtleT17XCJkb21haW5cIn0gbWV0YT17cC5tZXRhfSBzaG93TGluaz17ZmFsc2V9IC8+XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImF1dGhvclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGFiZWxcIj5BVVRIT1I8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPEFDQyBzaG9ydD17dHJ1ZX0+e3AubWV0YS5hdXRob3J9PC9BQ0M+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7cC5tZXRhLnByaWNlLmFtb3VudCAmJiBwLm1ldGEucHJpY2UuYW1vdW50ICE9PSBcIjBcIiA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInByaWNlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxhYmVsXCI+UFJJQ0U8L2Rpdj5cbiAgICAgICAgICAgIDxJQ1AgZGlnaXRzPXsyfT57cC5tZXRhLnByaWNlLmFtb3VudH08L0lDUD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICA8L1RodW1iTGFyZ2U+XG4gICk7XG59O1xuXG5jb25zdCBNZXRhRG9tYWluVHdpdHRlciA9ICh7IG1ldGEsIHNob3dMaW5rIH0pID0+IHtcbiAgbGV0IHVybCA9IG5ldyBVUkwoXCJodHRwczovL1wiICsgbWV0YS5kb21haW4pO1xuICBsZXQgc3VybCA9IHVybC5ocmVmLnJlcGxhY2UoL15odHRwcz86XFwvXFwvLywgXCJcIik7XG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcbiAgY29uc3QgZG9tYWluSW5mbyA9IHVzZVNlbGVjdG9yKChzdGF0ZSkgPT4gc3RhdGUuaW52ZW50b3J5W3N1cmwgKyBcIl9kb21haW5cIl0pO1xuICBjb25zdCBpc0xvYWRpbmcgPSBkb21haW5JbmZvID09PSAtMSA/IHRydWUgOiBmYWxzZTtcbiAgbGV0IHZlcmlmaWVkID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgaWYgKCFpc0xvYWRpbmcgJiYgZG9tYWluSW5mbyA9PT0gbWV0YS5hdXRob3IpIHZlcmlmaWVkID0gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICB9XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBkaXNwYXRjaCh2ZXJpZnlfZG9tYWluVHdpdHRlcihzdXJsKSk7XG4gIH0sIFtzdXJsLCBkaXNwYXRjaF0pO1xuXG4gIGxldCB1cmxTYWZlID0gdmVyaWZpZWQgPyBcImh0dHBzOi8vXCIgKyBzdXJsIDogbnVsbDtcblxuICBjb25zdCBbYSwgYiwgYywgZF0gPSBtZXRhLmRvbWFpbi5zcGxpdChcIi9cIik7XG5cbiAgbGV0IGNvbnRlbnQgPSAoXG4gICAgPD5cbiAgICAgIHthfS97Yn17XCIgXCJ9XG4gICAgICB7aXNMb2FkaW5nID8gKFxuICAgICAgICA8U3Bpbm5lciBzaXplPVwieHNcIiAvPlxuICAgICAgKSA6IHZlcmlmaWVkID8gKFxuICAgICAgICA8VmVyaWZpZWRJY29uIHc9e1wiMTZweFwifSBoPXtcIjE2cHhcIn0gLz5cbiAgICAgICkgOiBudWxsfVxuICAgIDwvPlxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPEJveFxuICAgICAgY29sb3I9e3ZlcmlmaWVkID8gXCJncmVlbi4zMDBcIiA6IGlzTG9hZGluZyA/IG51bGwgOiBcInJlZC4zMDBcIn1cbiAgICAgIGFzPXt2ZXJpZmllZCA/IG51bGwgOiBpc0xvYWRpbmcgPyBudWxsIDogXCJzXCJ9XG4gICAgPlxuICAgICAge3Nob3dMaW5rICYmIHVybFNhZmUgPyAoXG4gICAgICAgIDxhIGhyZWY9e3VybFNhZmV9IHJlbD1cIm5vcmVmZXJyZXJcIiB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgICAgICB7Y29udGVudH1cbiAgICAgICAgPC9hPlxuICAgICAgKSA6IChcbiAgICAgICAgY29udGVudFxuICAgICAgKX1cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmNvbnN0IE1ldGFEb21haW4gPSAoeyBtZXRhLCBzaG93TGluayB9KSA9PiB7XG4gIGxldCB1cmwgPSBuZXcgVVJMKFwiaHR0cHM6Ly9cIiArIG1ldGEuZG9tYWluKTtcbiAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuICBjb25zdCBkb21haW5JbmZvID0gdXNlU2VsZWN0b3IoXG4gICAgKHN0YXRlKSA9PiBzdGF0ZS5pbnZlbnRvcnlbdXJsLmhvc3RuYW1lICsgXCJfZG9tYWluXCJdXG4gICk7XG4gIGNvbnN0IGlzTG9hZGluZyA9IGRvbWFpbkluZm8gPT09IC0xID8gdHJ1ZSA6IGZhbHNlO1xuICBsZXQgdmVyaWZpZWQgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICBpZiAoXG4gICAgICAhaXNMb2FkaW5nICYmXG4gICAgICB0eXBlb2YgZG9tYWluSW5mbyA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgZG9tYWluSW5mb1t1cmwucGF0aG5hbWVdLmluZGV4T2YobWV0YS5hdXRob3IpICE9PSAtMVxuICAgIClcbiAgICAgIHZlcmlmaWVkID0gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICB9XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBkaXNwYXRjaCh2ZXJpZnlfZG9tYWluKHVybC5ob3N0bmFtZSkpO1xuICB9LCBbdXJsLmhvc3RuYW1lLCBkaXNwYXRjaF0pO1xuXG4gIGxldCB1cmxTYWZlID0gdmVyaWZpZWQgPyBcImh0dHBzOi8vXCIgKyB1cmwuaG9zdG5hbWUgKyB1cmwucGF0aG5hbWUgOiBudWxsO1xuXG4gIGxldCBjb250ZW50ID0gKFxuICAgIDw+XG4gICAgICB7bWV0YS5kb21haW59e1wiIFwifVxuICAgICAge2lzTG9hZGluZyA/IChcbiAgICAgICAgPFNwaW5uZXIgc2l6ZT1cInhzXCIgLz5cbiAgICAgICkgOiB2ZXJpZmllZCA/IChcbiAgICAgICAgPFZlcmlmaWVkSWNvbiB3PXtcIjE2cHhcIn0gaD17XCIxNnB4XCJ9IC8+XG4gICAgICApIDogbnVsbH1cbiAgICA8Lz5cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxCb3hcbiAgICAgIGNvbG9yPXt2ZXJpZmllZCA/IFwiZ3JlZW4uMzAwXCIgOiBpc0xvYWRpbmcgPyBudWxsIDogXCJyZWQuMzAwXCJ9XG4gICAgICBhcz17dmVyaWZpZWQgPyBudWxsIDogaXNMb2FkaW5nID8gbnVsbCA6IFwic1wifVxuICAgID5cbiAgICAgIHtzaG93TGluayAmJiB1cmxTYWZlID8gKFxuICAgICAgICA8YSBocmVmPXt1cmxTYWZlfSByZWw9XCJub3JlZmVycmVyXCIgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgICAge2NvbnRlbnR9XG4gICAgICAgIDwvYT5cbiAgICAgICkgOiAoXG4gICAgICAgIGNvbnRlbnRcbiAgICAgICl9XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuXG5jb25zdCBjYXBpdGFsaXplID0gKHgpID0+IHguY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB4LnNsaWNlKDEpO1xuXG5leHBvcnQgY29uc3QgTkZUSW5mbyA9ICh7IGlkLCBtZXRhIH0pID0+IHtcbiAgY29uc3QgbW9kZSA9IHVzZUNvbG9yTW9kZVZhbHVlKFwibGlnaHRcIiwgXCJkYXJrXCIpO1xuXG4gIGNvbnN0IGJnID0gdXNlQ29sb3JNb2RlVmFsdWUoXCJncmF5LjEwMFwiLCBcImdyYXkuNzAwXCIpO1xuICBjb25zdCB0ZXh0Q29sb3IgPSB1c2VDb2xvck1vZGVWYWx1ZShcImdyYXkuOTAwXCIsIFwiZ3JheS4xMDBcIik7XG4gIGNvbnN0IGlzRGFyayA9IG1vZGUgPT09IFwiZGFya1wiO1xuICBpZiAoIW1ldGEgfHwgIShcInF1YWxpdHlcIiBpbiBtZXRhKSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHFjb2xvciA9IGl0ZW1RdWFsaXR5W21vZGVdW21ldGEucXVhbGl0eV0uY29sb3I7XG4gIGxldCBub3dNaW51dGVzID0gTWF0aC5mbG9vcihEYXRlLm5vdygpIC8gMTAwMCAvIDYwKTtcblxuICBsZXQgdGhpbmdzID0gW1xuICAgIG1ldGEubmFtZSA/IChcbiAgICAgIDxUZXh0IGtleT17XCJuYW1lXCJ9IGNvbG9yPXtxY29sb3J9IGZvbnRTaXplPVwiMTZweFwiPlxuICAgICAgICB7Y2FwaXRhbGl6ZShtZXRhLm5hbWUpfVxuICAgICAgPC9UZXh0PlxuICAgICkgOiBudWxsLFxuICAgIG1ldGEudGFncyAmJiBtZXRhLnRhZ3MubGVuZ3RoID8gKFxuICAgICAgPFdyYXAga2V5PXtcInRhZ3NcIn0gc3BhY2luZz17MX0+XG4gICAgICAgIHttZXRhLnRhZ3MubWFwKChhLCBpZHgpID0+IChcbiAgICAgICAgICA8VGFnIGtleT17aWR4fSBzaXplPVwic21cIiBiZz17aXNEYXJrID8gXCJncmF5LjYwMFwiIDogXCJncmF5LjMwMFwifT5cbiAgICAgICAgICAgIHthfVxuICAgICAgICAgIDwvVGFnPlxuICAgICAgICApKX1cbiAgICAgIDwvV3JhcD5cbiAgICApIDogbnVsbCxcbiAgICBtZXRhLmRvbWFpbiA/IChcbiAgICAgIG1ldGEuZG9tYWluLmluZGV4T2YoXCJ0d2l0dGVyLmNvbS9cIikgIT09IC0xID8gKFxuICAgICAgICA8TWV0YURvbWFpblR3aXR0ZXIga2V5PXtcImRvbWFpblwifSBtZXRhPXttZXRhfSBzaG93TGluaz17dHJ1ZX0gLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxNZXRhRG9tYWluIGtleT17XCJkb21haW5cIn0gbWV0YT17bWV0YX0gc2hvd0xpbms9e3RydWV9IC8+XG4gICAgICApXG4gICAgKSA6IG51bGwsXG4gICAgXCJiaW5kc0ZvcmV2ZXJcIiBpbiBtZXRhLnRyYW5zZmVyID8gKFxuICAgICAgPFRleHQga2V5PXtcImJpbmRzRm9yZXZlclwifSBmb250U2l6ZT1cIjE0cHhcIj5cbiAgICAgICAgQmluZHMgb24gdHJhbnNmZXJcbiAgICAgIDwvVGV4dD5cbiAgICApIDogbnVsbCxcbiAgICBcImJpbmRzRHVyYXRpb25cIiBpbiBtZXRhLnRyYW5zZmVyID8gKFxuICAgICAgPFRleHQga2V5PXtcImJpbmRzRHVyYXRpb25cIn0gZm9udFNpemU9XCIxNHB4XCI+XG4gICAgICAgIEJpbmRzIG9uIHRyYW5zZmVyIGZvcntcIiBcIn1cbiAgICAgICAge21vbWVudC5kdXJhdGlvbihtZXRhLnRyYW5zZmVyLmJpbmRzRHVyYXRpb24sIFwibWludXRlc1wiKS5odW1hbml6ZSgpfVxuICAgICAgPC9UZXh0PlxuICAgICkgOiBudWxsLFxuICAgIG1ldGEuYm91bmRVbnRpbCA+IG5vd01pbnV0ZXMgPyAoXG4gICAgICA8VGV4dFxuICAgICAgICBrZXk9XCJib3VuZFVudGlsXCJcbiAgICAgICAgZm9udFNpemU9XCIxNHB4XCJcbiAgICAgICAgY29sb3I9e2lzRGFyayA/IFwiZ3JlZW4uNDAwXCIgOiBcImdyZWVuLjgwMFwifVxuICAgICAgICBhcz1cImlcIlxuICAgICAgPlxuICAgICAgICB7XCJib3VuZCBmb3IgXCIgK1xuICAgICAgICAgIG1vbWVudC5kdXJhdGlvbihtZXRhLmJvdW5kVW50aWwgLSBub3dNaW51dGVzLCBcIm1pbnV0ZXNcIikuaHVtYW5pemUoKX1cbiAgICAgIDwvVGV4dD5cbiAgICApIDogbnVsbCxcbiAgICBtZXRhPy51c2U/LmNvbnN1bWFibGU/LmRlc2MgPyAoXG4gICAgICA8VGV4dFxuICAgICAgICBrZXk9XCJjb25zdW1hYmxlXCJcbiAgICAgICAgZm9udFNpemU9XCIxNHB4XCJcbiAgICAgICAgY29sb3I9e2lzRGFyayA/IFwiZ3JlZW4uNDAwXCIgOiBcImdyZWVuLjgwMFwifVxuICAgICAgICBhcz1cImlcIlxuICAgICAgPlxuICAgICAgICBVc2U6IHtjYXBpdGFsaXplKG1ldGEudXNlLmNvbnN1bWFibGUuZGVzYyl9IChDb25zdW1lZCBpbiB0aGUgcHJvY2VzcylcbiAgICAgIDwvVGV4dD5cbiAgICApIDogbnVsbCxcbiAgICBtZXRhLmNvb2xkb3duVW50aWwgPiBub3dNaW51dGVzID8gKFxuICAgICAgPFRleHRcbiAgICAgICAga2V5PVwiY29vbGRvd25VbnRpbFwiXG4gICAgICAgIGZvbnRTaXplPVwiMTRweFwiXG4gICAgICAgIGNvbG9yPXtpc0RhcmsgPyBcImdyZWVuLjQwMFwiIDogXCJncmVlbi44MDBcIn1cbiAgICAgID5cbiAgICAgICAge21vbWVudFxuICAgICAgICAgIC5kdXJhdGlvbihtZXRhLmNvb2xkb3duVW50aWwgLSBub3dNaW51dGVzLCBcIm1pbnV0ZXNcIilcbiAgICAgICAgICAuaHVtYW5pemUoKSArIFwiIGNvb2xkb3duIGxlZnRcIn1cbiAgICAgIDwvVGV4dD5cbiAgICApIDogbnVsbCxcbiAgICBtZXRhPy51c2U/LmNvb2xkb3duPy5kZXNjID8gKFxuICAgICAgPFRleHRcbiAgICAgICAga2V5PVwiY29vbGRvd25EZXNjXCJcbiAgICAgICAgZm9udFNpemU9XCIxNHB4XCJcbiAgICAgICAgY29sb3I9e2lzRGFyayA/IFwiZ3JlZW4uNDAwXCIgOiBcImdyZWVuLjgwMFwifVxuICAgICAgPlxuICAgICAgICBVc2U6IHtjYXBpdGFsaXplKG1ldGEudXNlLmNvb2xkb3duLmRlc2MpfSAoXG4gICAgICAgIHttb21lbnQuZHVyYXRpb24obWV0YS51c2UuY29vbGRvd24uZHVyYXRpb24sIFwibWludXRlc1wiKS5odW1hbml6ZSgpfXtcIiBcIn1cbiAgICAgICAgY29vbGRvd24pXG4gICAgICA8L1RleHQ+XG4gICAgKSA6IG51bGwsXG4gICAgbWV0YT8uc2VjcmV0ID8gKFxuICAgICAgPFRleHRcbiAgICAgICAga2V5PVwic2VjcmV0XCJcbiAgICAgICAgZm9udFNpemU9XCIxNHB4XCJcbiAgICAgICAgY29sb3I9e2lzRGFyayA/IFwicHVycGxlLjQwMFwiIDogXCJwdXJwbGUuODAwXCJ9XG4gICAgICA+XG4gICAgICAgIFNlY3JldFxuICAgICAgPC9UZXh0PlxuICAgICkgOiBudWxsLFxuICAgIG1ldGEuaG9sZD8uZXh0ZXJuYWw/LmRlc2MgPyAoXG4gICAgICA8VGV4dFxuICAgICAgICBrZXk9XCJob2xkXCJcbiAgICAgICAgZm9udFNpemU9XCIxNHB4XCJcbiAgICAgICAgY29sb3I9e2lzRGFyayA/IFwiZ3JlZW4uNDAwXCIgOiBcImdyZWVuLjgwMFwifVxuICAgICAgPlxuICAgICAgICBIb2xkOiB7Y2FwaXRhbGl6ZShtZXRhLmhvbGQuZXh0ZXJuYWwuZGVzYyl9XG4gICAgICA8L1RleHQ+XG4gICAgKSA6IG51bGwsXG4gICAgbWV0YS5hdHRyaWJ1dGVzICYmIG1ldGEuYXR0cmlidXRlcy5sZW5ndGhcbiAgICAgID8gbWV0YS5hdHRyaWJ1dGVzLm1hcCgoYSwgaWR4KSA9PiAoXG4gICAgICAgICAgPFRleHQga2V5PXtcImF0dHJcIiArIGlkeH0gZm9udFNpemU9XCIxNHB4XCI+XG4gICAgICAgICAgICB7YVsxXSA+PSAwID8gXCIrXCIgOiBcIlwifVxuICAgICAgICAgICAge2FbMV19IHtjYXBpdGFsaXplKGFbMF0pfVxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgKSlcbiAgICAgIDogbnVsbCxcbiAgICBtZXRhLmxvcmUgPyAoXG4gICAgICA8VGV4dFxuICAgICAgICBrZXk9XCJsb3JlXCJcbiAgICAgICAgZm9udFNpemU9XCIxNHB4XCJcbiAgICAgICAgcHQ9XCIxNHB4XCJcbiAgICAgICAgY29sb3I9e2lzRGFyayA/IFwieWVsbG93XCIgOiBcInllbGxvdy42MDBcIn1cbiAgICAgID5cbiAgICAgICAgXCJ7Y2FwaXRhbGl6ZShtZXRhLmxvcmUpfVwiXG4gICAgICA8L1RleHQ+XG4gICAgKSA6IG51bGwsXG4gICAgbWV0YS5yZWNoYXJnZWFibGUgJiYgbWV0YS50dGwgJiYgbWV0YS50dGwgPiAwID8gKFxuICAgICAgPFRleHRcbiAgICAgICAga2V5PVwidHRsXCJcbiAgICAgICAgZm9udFNpemU9XCIxNHB4XCJcbiAgICAgICAgcHQ9XCIxNHB4XCJcbiAgICAgICAgY29sb3I9e2lzRGFyayA/IFwiZ3JheS40MDBcIiA6IFwiZ3JheS44MDBcIn1cbiAgICAgID5cbiAgICAgICAgUmVjaGFyZ2UgaW4ge21vbWVudC5kdXJhdGlvbihtZXRhLnR0bCwgXCJtaW51dGVzXCIpLmh1bWFuaXplKCl9XG4gICAgICA8L1RleHQ+XG4gICAgKSA6IG51bGwsXG4gICAgIW1ldGEucmVjaGFyZ2VhYmxlICYmIG1ldGEudHRsICYmIG1ldGEudHRsID4gMCA/IChcbiAgICAgIDxUZXh0XG4gICAgICAgIGtleT1cInR0bFwiXG4gICAgICAgIGZvbnRTaXplPVwiMTRweFwiXG4gICAgICAgIHB0PVwiMTRweFwiXG4gICAgICAgIGNvbG9yPXtpc0RhcmsgPyBcImdyYXkuNDAwXCIgOiBcImdyYXkuODAwXCJ9XG4gICAgICA+XG4gICAgICAgIEV4cGlyZXMgaW4ge21vbWVudC5kdXJhdGlvbihtZXRhLnR0bCwgXCJtaW51dGVzXCIpLmh1bWFuaXplKCl9XG4gICAgICA8L1RleHQ+XG4gICAgKSA6IG51bGwsXG4gICAgbWV0YS5zb2NrZXRzICYmIG1ldGEuc29ja2V0cy5sZW5ndGggPyAoXG4gICAgICA8V3JhcCBrZXk9XCJzb2NrZXRzXCIgc3BhY2luZz17MH0+XG4gICAgICAgIHttZXRhLnNvY2tldHMubWFwKCh0aWQsIGlkeCkgPT4gKFxuICAgICAgICAgIDxORlQgaWQ9e3RpZH0ga2V5PXt0aWR9IC8+XG4gICAgICAgICkpfVxuICAgICAgPC9XcmFwPlxuICAgICkgOiBudWxsLFxuICAgIG1ldGEucHJpY2UuYW1vdW50ICYmIG1ldGEucHJpY2UuYW1vdW50ICE9PSBcIjBcIiA/IChcbiAgICAgIDxUZXh0IGtleT1cImljcFByaWNlXCI+XG4gICAgICAgIDxJQ1A+e21ldGEucHJpY2UuYW1vdW50fTwvSUNQPlxuICAgICAgPC9UZXh0PlxuICAgICkgOiBudWxsLFxuICAgIGlkID8gKFxuICAgICAgPEZsZXgga2V5PVwiZm9vdGVyXCIgcHQ9XCIxXCIgcHI9XCIxXCIgc3g9e3sgbGluZUhlaWdodDogXCI4cHg7XCIgfX0gcGI9XCIycHhcIj5cbiAgICAgICAgPE5GVEJhdHRlcnkgbWV0YT17bWV0YX0gLz5cbiAgICAgICAgPFNwYWNlciAvPlxuXG4gICAgICAgIDxUZXh0IGZvbnRTaXplPVwiMTBweFwiPlxuICAgICAgICAgIDxORlRBPntpZH08L05GVEE+XG4gICAgICAgIDwvVGV4dD5cbiAgICAgIDwvRmxleD5cbiAgICApIDogbnVsbCxcbiAgXS5maWx0ZXIoQm9vbGVhbik7XG5cbiAgaWYgKCF0aGluZ3MubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIChcbiAgICA8Qm94XG4gICAgICBiZz17Ymd9XG4gICAgICBjb2xvcj17dGV4dENvbG9yfVxuICAgICAgYm9yZGVyUmFkaXVzPVwibWRcIlxuICAgICAgdz17MzUwfVxuICAgICAgcD17Mn1cbiAgICAgIHN4PXt7IHBvc2l0aW9uOiBcInJlbGF0aXZlXCIgfX1cbiAgICA+XG4gICAgICB7bWV0YS5jb250ZW50Py50aHVtYj8udXJsID8gPGltZyBzcmM9e21ldGEuY29udGVudC50aHVtYi51cmx9IC8+IDogXCJcIn1cblxuICAgICAgPFN0YWNrIHNwYWNpbmc9ezB9Pnt0aGluZ3N9PC9TdGFjaz5cbiAgICA8L0JveD5cbiAgKTtcbn07XG5cbmNvbnN0IE5GVEJhdEZ1bGwgPSBzdHlsZWQuc3BhbmBcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkeyhwcm9wcykgPT4gcHJvcHMuY29sb3J9O1xuICB3aWR0aDogNHB4O1xuICBtYXJnaW4tbGVmdDogMXB4O1xuICBib3JkZXItcmFkaXVzOiAxcHg7XG4gIGhlaWdodDogN3B4O1xuYDtcblxuZXhwb3J0IGNvbnN0IE5GVEJhdHRlcnkgPSAoeyBtZXRhIH0pID0+IHtcbiAgY29uc3QgaWNwQ3ljbGVzID0gTnVtYmVyKHVzZVNlbGVjdG9yKChzdGF0ZSkgPT4gc3RhdGUudXNlci5vcmFjbGUuaWNwQ3ljbGVzKSk7XG5cbiAgY29uc3QgYXZnX21zZ19jb3N0X3B3ciA9IE51bWJlcihBVkdfTUVTU0FHRV9DT1NUKSAvIGljcEN5Y2xlczsgLy9UT0RPOiBjYWxjdWxhdGUgaXQgZnJvbSBvcmFjbGUgZGF0YVxuICBsZXQgdHRsID0gbWV0YS50dGwgPiAwID8gbWV0YS50dGwgOiBOdW1iZXIoRlVMTFlfQ0hBUkdFRF9NSU5VVEVTKTtcbiAgbGV0IG1zZ19mdWxsID0gKHR0bCAvIDYwIC8gMjQgKyAxMDApICogYXZnX21zZ19jb3N0X3B3cjtcbiAgbGV0IHBlcmMgPSBtZXRhLnB3clswXSAvIG1zZ19mdWxsO1xuICBsZXQgYXZnX251bV9vcHNfbGVmdCA9IE1hdGgucm91bmQobWV0YS5wd3JbMF0gLyBhdmdfbXNnX2Nvc3RfcHdyKTtcblxuICBsZXQgY29sb3IgPSBgcmdiKCR7TWF0aC5mbG9vcigxMjUgLSAxMjUgKiBwZXJjKX0sICR7TWF0aC5mbG9vcihcbiAgICAyMDAgKiBwZXJjXG4gICl9LCAyNTUpYDtcbiAgbGV0IGNvbG9yRW1wdHkgPSBgcmdiKCR7TWF0aC5mbG9vcigyNTUgLSAyNTUgKiBwZXJjKX0sIDcwLCA3MClgO1xuICByZXR1cm4gKFxuICAgIDxUb29sdGlwXG4gICAgICBoYXNBcnJvd1xuICAgICAgcGxhY2VtZW50PVwidG9wLXN0YXJ0XCJcbiAgICAgIGxhYmVsPXtcbiAgICAgICAgPEJveD5cbiAgICAgICAgICA8VGV4dCBmb250V2VpZ2h0PVwiYm9sZFwiIGZvbnRTaXplPVwiMTVweFwiIG1iPVwiMVwiIG10PVwiMVwiPlxuICAgICAgICAgICAge2F2Z19udW1fb3BzX2xlZnQgKyBcIiBvcGVyYXRpb25zIGxlZnRcIn1cbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICAgPFRleHQ+XG4gICAgICAgICAgICBJbmRpY2F0b3IgZGlzcGxheWluZyBQV1Igc3RvcmVkIGluc2lkZSB0aGUgTkZULiBSZWZpbGxzXG4gICAgICAgICAgICBhdXRvbWF0aWNhbGx5IG9uIG1hcmtldHBsYWNlIHNhbGUuXG4gICAgICAgICAgPC9UZXh0PlxuICAgICAgICA8L0JveD5cbiAgICAgIH1cbiAgICA+XG4gICAgICA8c3Bhbj5cbiAgICAgICAgPE5GVEJhdEZ1bGwgY29sb3I9e3BlcmMgPj0gMC4xNSA/IGNvbG9yIDogY29sb3JFbXB0eX0gLz5cbiAgICAgICAgPE5GVEJhdEZ1bGwgY29sb3I9e3BlcmMgPj0gMC41ID8gY29sb3IgOiBjb2xvckVtcHR5fSAvPlxuICAgICAgICA8TkZUQmF0RnVsbCBjb2xvcj17cGVyYyA+PSAwLjc1ID8gY29sb3IgOiBjb2xvckVtcHR5fSAvPlxuICAgICAgICA8TkZUQmF0RnVsbCBjb2xvcj17cGVyYyA+PSAwLjkgPyBjb2xvciA6IGNvbG9yRW1wdHl9IC8+XG4gICAgICA8L3NwYW4+XG4gICAgPC9Ub29sdGlwPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IE5GVFByb0luZm8gPSAoeyBpZCwgbWV0YSB9KSA9PiB7XG4gIGNvbnN0IGJnID0gdXNlQ29sb3JNb2RlVmFsdWUoXCJncmF5LjIwMFwiLCBcImdyYXkuOTAwXCIpO1xuICBpZiAoIW1ldGEgfHwgIShcInF1YWxpdHlcIiBpbiBtZXRhKSkgcmV0dXJuIG51bGw7XG5cbiAgbGV0IG5vd01pbnV0ZXMgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwIC8gNjApO1xuXG4gIC8vaWYgKCFtZXRhLm5hbWUpIHJldHVybiBudWxsO1xuICByZXR1cm4gKFxuICAgIDxCb3hcbiAgICAgIGJnPXtiZ31cbiAgICAgIGJvcmRlclJhZGl1cz1cIm1kXCJcbiAgICAgIHc9ezM1MH1cbiAgICAgIHA9ezJ9XG4gICAgICBzeD17eyB3b3JkQnJlYWs6IFwiYnJlYWstYWxsXCIsIHRleHRUcmFuc2Zvcm06IFwidXBwZXJjYXNlXCIgfX1cbiAgICA+XG4gICAgICB7bWV0YS5jb250ZW50Py50aHVtYj8udXJsID8gPGltZyBzcmM9e21ldGEuY29udGVudC50aHVtYi51cmx9IC8+IDogXCJcIn1cblxuICAgICAgPFN0YWNrIHNwYWNpbmc9ezB9PlxuICAgICAgICB7Lyoge2lkID8gKFxuICAgICAgICAgIDxUZXh0IGZvbnRTaXplPVwiOXB4XCIgc3g9e3sgdGV4dFRyYW5zZm9ybTogXCJ1cHBlcmNhc2VcIiB9fT5cbiAgICAgICAgICAgIElEOiA8TkZUQT57aWR9PC9ORlRBPlxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgKSA6IG51bGx9ICovfVxuICAgICAgICB7bWV0YS5wd3IgPyAoXG4gICAgICAgICAgPFRleHQgZm9udFNpemU9XCI5cHhcIj5cbiAgICAgICAgICAgIE9wczogPElDUD57bWV0YS5wd3JbMF19PC9JQ1A+IFN0b3JhZ2U6IDxJQ1A+e21ldGEucHdyWzFdfTwvSUNQPlxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHttZXRhLmJlYXJlciA/IChcbiAgICAgICAgICA8VGV4dCBmb250U2l6ZT1cIjlweFwiPlxuICAgICAgICAgICAgQmVhcmVyOiA8QUNDIHNob3J0PXt0cnVlfT57bWV0YS5iZWFyZXJ9PC9BQ0M+XG4gICAgICAgICAgPC9UZXh0PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge21ldGEuYXV0aG9yID8gKFxuICAgICAgICAgIDxUZXh0IGZvbnRTaXplPVwiOXB4XCIgc3g9e3t9fT5cbiAgICAgICAgICAgIEF1dGhvcjogPEFDQyBzaG9ydD17dHJ1ZX0+e21ldGEuYXV0aG9yfTwvQUNDPlxuICAgICAgICAgIDwvVGV4dD5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHttZXRhLmF1dGhvclNoYXJlID8gKFxuICAgICAgICAgIDxUZXh0IGZvbnRTaXplPVwiOXB4XCI+XG4gICAgICAgICAgICBBdXRob3IncyBzaGFyZTogPGI+eyhtZXRhLmF1dGhvclNoYXJlIC8gMTAwKS50b0ZpeGVkKDIpfSU8L2I+XG4gICAgICAgICAgPC9UZXh0PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge21ldGEuY3JlYXRlZCA/IChcbiAgICAgICAgICA8VGV4dCBmb250U2l6ZT1cIjlweFwiPlxuICAgICAgICAgICAgTWludGVkOiB7bW9tZW50KG1ldGEuY3JlYXRlZCAqIDYwICogMTAwMCkuZm9ybWF0KFwiTExMTFwiKX1cbiAgICAgICAgICA8L1RleHQ+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7bWV0YS5lbnRyb3B5ID8gKFxuICAgICAgICAgIDxUZXh0IGZvbnRTaXplPVwiOXB4XCI+XG4gICAgICAgICAgICBFbnRyb3B5OiA8SEFTSD57dG9IZXhTdHJpbmcobWV0YS5lbnRyb3B5KX08L0hBU0g+XG4gICAgICAgICAgPC9UZXh0PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvU3RhY2s+XG4gICAgPC9Cb3g+XG4gICk7XG59O1xuIl19