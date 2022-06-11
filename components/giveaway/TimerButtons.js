import React, { useEffect, useState } from "react";
import styles from "../../styles/giveaway.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { selectTimer } from "../../redux/actions/giveawaySlice";
import {
  ButtonGroup,
  Button,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  ThemeProvider,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { colorTheme } from "../MuiColorThemes";

const TimerButtons = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const options = [
    "45 Seconds",
    "30 Seconds",
    "15 Seconds",
    "10 Seconds",
    "5 Seconds",
    "Off",
  ];

  // const [timerSelected, setTimerSelected] = useState("30");
  const session = useSession();
  const timerSelected = useSelector((state) => state.giveaway.timerSelected);
  const timerArray = useSelector((state) => state.giveaway.timer);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const timeSelectionHandler = (timerSelected, timer) => {
    dispatch(selectTimer({ timerSelected: timerSelected, timer: timer }));

    fetch("api/raffleSocket", {
      method: "POST",
      body: JSON.stringify({
        emit: "req-timer-selection",
        streamer: session.data.name,
        modFor: session.data.modFor,
        body: { timer: timerArray, timerSelected: timerSelected },
      }),
    });
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);

    if (index === 0) {
      timeSelectionHandler(45, [750, 250, 95, 25]);
      setSelectedIndex(45);
    } else if (index === 1) {
      timeSelectionHandler(30, [400, 120, 60, 20]);
      setSelectedIndex(30);
    } else if (index === 2) {
      timeSelectionHandler(15, [200, 60, 30, 10]);
      setSelectedIndex(15);
    } else if (index === 3) {
      timeSelectionHandler(10, [150, 40, 20, 6]);
      setSelectedIndex(3);
    } else if (index === 4) {
      timeSelectionHandler(5, [65, 15, 7, 5]);
      setSelectedIndex(5);
    } else if (index === 5) {
      timeSelectionHandler(0, [0, 0, 0, 0]);
      setSelectedIndex(0);
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <p style={{ lineHeight: 0 }}>Timer</p>
      <div className={styles.timers}>
        <ThemeProvider theme={colorTheme}>
          <ButtonGroup
            variant="contained"
            ref={anchorRef}
            aria-label="split button"
            disableElevation="true"
          >
            <Button
              fullWidth={true}
              style={{ minWidth: 150 }}
            >{`${timerSelected} Seconds`}</Button>
            <Button
              size="small"
              aria-controls={open ? "split-button-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-label="select merge strategy"
              aria-haspopup="menu"
              onClick={handleToggle}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
        </ThemeProvider>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </>
  );
};

export default TimerButtons;
