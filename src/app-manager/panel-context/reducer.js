import produce from "immer";

export default produce((draft, action) => {
  switch (action.type) {
    case "SEARCH_UNPUBLISHED_ARTICLE":
      draft.searchUnpublishArticle = action.payload;
      break;
    case "SEARCH_REVIEW_ARTICLE":
      draft.searchReviewArticle = action.payload;
      break;
    case "SEARCH_READY_ARTICLE":
      draft.searchReadyArticle = action.payload;
      break;
    case "SET_ARTICLE_TITLE":
      draft.articleData.title = action.payload;
      break;
    case "SET_ARTICLE_ABSTRACT":
      draft.articleData.abstract = action.payload;
      break;
    case "SET_ARTICLE_KEYWORDS":
      draft.articleData.keywords = action.payload;
      break;
    case "SET_ARTICLE_START_PAGE":
      draft.articleData.startPage = action.payload;
      break;
    case "SET_ARTICLE_END_PAGE":
      draft.articleData.endPage = action.payload;
      break;
    case "SET_ARTICLE_VOLUME":
      draft.articleData.volume = action.payload;
      break;
    case "SET_ARTICLE_ISSUE_TYPE":
      draft.articleData.issueType = action.payload;
      break;
    case "SET_ARTICLE_DATE":
      draft.articleData.day = action.payload.day;
      draft.articleData.month = action.payload.month;
      draft.articleData.year = action.payload.year;
      break;
    case "SET_ARTICLE_PRIMARY_AUTHOR":
      draft.articleData.authorDetails.primary.name = action.payload.name;
      draft.articleData.authorDetails.primary.email = action.payload.email;
      draft.articleData.authorDetails.primary.phone = action.payload.phone;
      draft.articleData.authorDetails.primary.country = action.payload.country;
      draft.articleData.authorDetails.primary.affiliation =
        action.payload.affiliation;
      draft.articleData.primaryAuthor = action.payload.name;
      break;

    case "SET_ARTICLE_DATA":
      draft.articleData = action.payload;
      break;

    case "ADD_SECONDARY_AUTHOR":
      draft.articleData.authorDetails.secondaryAuthors = [
        ...draft.articleData.authorDetails.secondaryAuthors,
        {
          name: "",
          email: "",
          phone: "",
          affiliation: "",
          country: "",
        },
      ];
      break;
    case "REMOVE_SECONDARY_AUTHOR":
      draft.articleData.authorDetails.secondaryAuthors =
        draft.articleData.authorDetails.secondaryAuthors.filter(
          (author, index) => index !== action.payload
        );
      draft.articleData.secondaryAuthors =
        draft.articleData.secondaryAuthors.filter(
          (author, index) => index !== action.payload
        );
      break;
    case "SET_SECONDARY_AUTHOR_DATA":
      draft.articleData.authorDetails.secondaryAuthors[
        action.payload.index
      ].name = action.payload.name;
      draft.articleData.authorDetails.secondaryAuthors[
        action.payload.index
      ].country = action.payload.country;
      draft.articleData.authorDetails.secondaryAuthors[
        action.payload.index
      ].email = action.payload.email;
      draft.articleData.authorDetails.secondaryAuthors[
        action.payload.index
      ].phone = action.payload.phone;
      draft.articleData.authorDetails.secondaryAuthors[
        action.payload.index
      ].affiliation = action.payload.affiliation;

      break;
    case "SET_SEC_AUTHORS":
      draft.articleData.authorDetails.secondaryAuthors.map((details) =>
        draft.articleData.secondaryAuthors.push(details.name)
      );
      break;
    case "INCREASE_FORM_INDEX":
      draft.formIndex += 1;
      break;
    case "DECREASE_FORM_INDEX":
      draft.formIndex -= 1;
      break;
    case "RESET_FORM_INDEX":
      draft.formIndex = 0;
      break;
    case "RESET_FORM_DATA":
      draft.articleData = action.payload;
      break;
    case "SET_SECONDARY_AUTHORS_NAME":
      draft.articleData.authorDetails.secondaryAuthors.length > 0 &&
        draft.articleData.authorDetails.secondaryAuthors.forEach((author) => {
          if (!draft.articleData.secondaryAuthors.includes(author.name)) {
            draft.articleData.secondaryAuthors.push(author.name);
          }
        });
      break;
    case "SET_POPUP_STATE":
      draft.popUpState = action.payload;
      break;
    case "SHOW_FORM_RESPONSE":
      draft.showFormResponse = action.payload;
      break;
    case "SET_SELECTED_VOLUME":
      draft.getVolumeData.selectedVolume = action.payload;
      break;
    case "SET_SELECTED_ISSUE":
      draft.getVolumeData.selectedIssue = action.payload;
      break;
    case "SET_ISSUE_TYPE":
      draft.getVolumeData.selectedIssueType = action.payload;
      if (action.payload === "Special Issue") {
        draft.specialIssue = true;
      } else {
        draft.specialIssue = false;
      }
      break;
    case "SET_SELECTED_DATE":
      draft.getVolumeData.selectedDate = action.payload;
      break;
    case "CREATED_NEW_VOLUME":
      draft.createdNewVol = true;
      break;
    case "CREATE_NEW_VOLUME":
      draft.newVolumeCreated.volumeNumber = action.payload;
      break;
    case "CREATE_NEW_ISSUE":
      draft.newVolumeCreated.issue = action.payload;
      break;
    case "RESET_VOLUME_SELECTION":
      draft.getVolumeData.selectedDate = "";
      draft.getVolumeData.selectedVolume = "Select Volume";
      draft.getVolumeData.selectedIssue = "Select Issue";
      draft.getVolumeData.selectedIssueType = "";
      draft.totalPage = "";

      break;
    case "FINAL_ARTICLE_DATA":
      draft.publishArticleData = action.payload;
      break;
    case "SET_TOTAL_PAGE":
      draft.totalPage = action.payload;
      break;
    case "UPDATE_END_PAGE":
      draft.publishArticleData.endPage =
        draft.totalPage + draft.publishArticleData.startPage - 1;
      break;
    case "SET_FINAL_FILE":
      draft.finalFile = action.payload;
      break;
    case "SET_ARTICLE_STATUS":
      draft.articleData.status =
        draft.articleData.status === "review" ? "ready" : "review";
      break;
    case "SET_OLD_ARTICLE_ID":
      draft.oldArticleId = action.payload;
      break;
    case "UPDATE_FINAL_DATA":
      const {
        volume,
        issue,
        articleId,
        identifier,
        doiIdentifier,
        doiPrefix,
        startPage,
        fileName,
        filePath,
        year,
        day,
        month,
      } = action.payload;
      draft.publishArticleData.volume = volume;
      draft.publishArticleData.issue = issue;
      draft.publishArticleData.articleId = articleId;
      draft.publishArticleData.doiIdentifier = doiIdentifier;
      draft.publishArticleData.doiPrefix = doiPrefix;
      draft.publishArticleData.startPage = startPage;
      draft.publishArticleData.fileName = fileName;
      draft.publishArticleData.identifier = identifier;
      draft.publishArticleData.filePath = filePath;
      draft.publishArticleData.year = year;
      draft.publishArticleData.day = day;
      draft.publishArticleData.month = month;
      break;
    case "ADD_FEEDBACK_MESSAGE":
      draft.notification.message = action.payload.message;
      draft.notification.status = action.payload.status;
      draft.notification.sent = true;
      break;
    case "REMOVE_FEEDBACK_MESSAGE":
      draft.notification.message = "";
      draft.notification.status = "success";
      draft.notification.sent = false;
      break;
    case "SET_RESPONSE_TEXT":
      draft.responseText = action.payload;
      draft.popupResponse = true;
      break;
    case "CLOSE_POPUP_RESPONSE":
      draft.responseText = "";
      draft.popupResponse = false;
      break;
    case "INVALID_FILE_TYPE":
      draft.invalidFile = !draft.invalidFile;
      break;
    case "SET_SEARCH_ARTICLE_ID":
      draft.searchArticleId = action.payload;
      break;
    default:
      return draft;
  }
});
