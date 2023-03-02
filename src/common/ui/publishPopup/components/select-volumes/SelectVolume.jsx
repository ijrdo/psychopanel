import React, { useState } from "react";
import { usePanelData } from "app-manager/panel-context/PanelProvider";
import { PanelButton } from "common/ui/panelButton/PanelButton";
import { useArticleData } from "app-manager/query/sendVol";
import { useAuth } from "app-manager/auth/AuthProvider";
import { useQueryData } from "app-manager/query/getQueryData";
import "./style.css";

const SelectVolume = () => {
  const { token, sessionId } = useAuth();
  const { state, dispatch } = usePanelData();
  const { getVolumeData, specialIssue } = state;
  const { selectedVolume, selectedIssue, selectedDate, selectedIssueType } =
    getVolumeData;
  const [showVolDD, setShowVolDD] = useState(false);
  const [showIssueDD, setShowIssueDD] = useState(false);

  const date = Date.parse(selectedDate);

  const volumeData = useQueryData(["volumes"]);

  const { refetch, isFetching } = useArticleData(
    sessionId,
    token,
    selectedVolume,
    selectedIssue,
    selectedIssueType,
    date,
    dispatch
  );
  const handleSelectVolume = () => {
    setShowVolDD((prev) => !prev);
  };

  const handleSelectVolumeValue = (e) => {
    setShowVolDD((prev) => !prev);
    dispatch({ type: "SET_SELECTED_VOLUME", payload: e });
  };

  const handleSelectIssue = () => {
    setShowIssueDD((prev) => !prev);
  };

  const handleSelectIssueValue = (e) => {
    dispatch({ type: "SET_SELECTED_ISSUE", payload: e });
    setShowIssueDD((prev) => !prev);
  };
  const showReviewFn = (e) => {
    e.preventDefault();
    refetch();
  };

  const getDate = (e) => {
    dispatch({ type: "SET_SELECTED_DATE", payload: e.target.value });
  };
  const goBack = () => {
    dispatch({ type: "SET_POPUP_STATE", payload: 1 });
  };
  const getIssueType = (e) => {
    dispatch({ type: "SET_ISSUE_TYPE", payload: e.target.value });
  };
  const createNewVolume = () => {
    const newVolume = volumeData[0].volumeNumber + 1;
    dispatch({ type: "SET_SELECTED_VOLUME", payload: newVolume });
    dispatch({
      type: "CREATE_NEW_VOLUME",
      payload: newVolume,
    });
    dispatch({ type: "CREATED_NEW_VOLUME" });
    setShowVolDD((prev) => !prev);
  };
  let issue = 0;
  const createNewIssue = () => {
    volumeData?.forEach((volume) => {
      if (selectedVolume === volume.volumeNumber) {
        issue = volume.issues[volume?.issues?.length - 1].split(" ");
      }
    });
    dispatch({
      type: "SET_SELECTED_ISSUE",
      payload: issue.length ? +issue[issue?.length - 1] + 1 : issue + 1,
    });
    dispatch({
      type: "CREATE_NEW_ISSUE",
      payload: issue.length ? +issue[issue?.length - 1] + 1 : issue + 1,
    });
    dispatch({ type: "CREATED_NEW_VOLUME" });
    setShowIssueDD((prev) => !prev);
  };
  return (
    <form id="selectVolume_main">
      <div className="popupBtns">
        <PanelButton onClick={goBack}>Back</PanelButton>
        <PanelButton type="submit" sending={isFetching} onClick={showReviewFn}>
          Next
        </PanelButton>
      </div>
      <div className="selectBox">
        <h3>Select Date</h3>
        <input
          onChange={getDate}
          value={selectedDate}
          className="date_input"
          type="date"
          required
        />
      </div>
      <div className="selectBox">
        <h3>Select Volume</h3>
        <div className="label-box">
          <label className="selection-label" onClick={handleSelectVolume}>
            {selectedVolume}
          </label>
          {showVolDD && (
            <div className="volume_title-card">
              <p
                key="new-volume"
                className="volume-title"
                onClick={createNewVolume}
              >
                Create New Volume
              </p>
              {volumeData?.map((volume, i) => {
                return (
                  <p
                    key={volume + i}
                    className="volume-title"
                    onClick={() => handleSelectVolumeValue(volume.volumeNumber)}
                  >
                    Volume-{volume.volumeNumber}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="selectBox">
        <h3>Select Issue Type</h3>
        <div className="select_issue-type">
          <label>
            <input
              type="radio"
              id="contactChoice1"
              name="Issue"
              value="Issue"
              checked={selectedIssueType === "Issue" ? true : false}
              onChange={getIssueType}
            />
            Issue
          </label>
          <label>
            <input
              type="radio"
              id="contactChoice2"
              name="Issue"
              checked={selectedIssueType === "Special Issue" ? true : false}
              onChange={getIssueType}
              value="Special Issue"
            />
            SpecialIssue
          </label>
        </div>
      </div>
      <div className="selectBox">
        <h3>Select Issue</h3>
        <div className="label-box">
          <label className="selection-label" onClick={handleSelectIssue}>
            {selectedIssue}
          </label>
          {showIssueDD && (
            <div className="issue_title-card">
              <p
                key="new-issue"
                className="issue-title"
                onClick={createNewIssue}
              >
                Create New Issue
              </p>
              {volumeData?.map((volume) => {
                if (selectedVolume === volume.volumeNumber)
                  return volume?.issues.map((issue, i) => (
                    <p
                      className="issue-title"
                      key={issue + i}
                      onClick={() => handleSelectIssueValue(issue)}
                    >
                      {issue}
                    </p>
                  ));
                return false;
              })}
            </div>
          )}
        </div>
      </div>
      {specialIssue && (
        <div className="selectBox">
          <h3>Special Issue</h3>
          <div className="label-box">
            <input type="text" placeholder="Enter special Issue" />
          </div>
        </div>
      )}
    </form>
  );
};

export default SelectVolume;
