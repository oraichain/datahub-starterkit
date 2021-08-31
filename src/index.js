import "./assets/styles/global.scss";
import { LabelStudio } from "./LabelStudio";

window.LabelStudio = new LabelStudio("label-studio", {
  description: "Description",
  interfaces: [
    "panel",
    "update",
    "submit",
    "skip",
    "controls",
    "review",
    "infobar",
    "instruction",
    "side-column",
    "ground-truth",
    "annotations:history",
    "annotations:tabs",
    "annotations:menu",
    "annotations:current",
    "annotations:add-new",
    "annotations:delete",
    "annotations:view-all",
    "predictions:tabs",
    "predictions:menu",
  ],
  user: {
    id: 1,
    first_name: "Nick",
    last_name: "Skriabin",
    username: "nick",
    email: "nick@heartex.ai",
    avatar: null,
    initials: "ni",
  },

  task: {
    annotations: [],
    predictions: [],
    id: 1,
    data: {
      image:
        "https://htx-misc.s3.amazonaws.com/opensource/label-studio/examples/images/nick-owuor-astro-nic-visuals-wDifg5xc9Z4-unsplash.jpg",
    },
  },
  history: [
    {
      id: 16,
      created_by: 1,
      created_at: "2021-05-26T13:03:36.267438Z",
      accepted: true,
      result: null,
      annotation: 24,
      fixed_annotation_history: null,
      previous_annotation_history: 33,
      previous_annotation_history_result: [
        {
          id: "XsW_x1hflv",
          type: "labels",
          value: {
            end: 838,
            text:
              "Media, a Happy and Healthy New Year. 2018 will be a great year for America!  Donald J. Trump (@realDonaldTrump) December 31, 2017Trump s tweet went down about as we",
            start: 674,
            labels: ["LOC"],
          },
          to_name: "text",
          from_name: "label",
        },
        {
          id: "FCuvjfSXNs",
          type: "labels",
          value: {
            end: 1662,
            text:
              " Sandoval (@AlanSandoval13) December 31, 2017Who uses the word Haters in a New Years wish??  Marlene (@marlene399) December 31, 2017You can t just say happy ",
            start: 1505,
            labels: ["MISC"],
          },
          to_name: "text",
          from_name: "label",
        },
      ],
    },
    {
      id: 17,
      created_by: 1,
      created_at: "2021-05-26T13:03:43.335198Z",
      accepted: true,
      result: null,
      annotation: 24,
      fixed_annotation_history: 34,
      previous_annotation_history: 33,
      previous_annotation_history_result: [
        {
          id: "XsW_x1hflv",
          type: "labels",
          value: {
            end: 838,
            text:
              "Media, a Happy and Healthy New Year. 2018 will be a great year for America!  Donald J. Trump (@realDonaldTrump) December 31, 2017Trump s tweet went down about as we",
            start: 674,
            labels: ["LOC"],
          },
          to_name: "text",
          from_name: "label",
        },
        {
          id: "FCuvjfSXNs",
          type: "labels",
          value: {
            end: 1662,
            text:
              " Sandoval (@AlanSandoval13) December 31, 2017Who uses the word Haters in a New Years wish??  Marlene (@marlene399) December 31, 2017You can t just say happy ",
            start: 1505,
            labels: ["MISC"],
          },
          to_name: "text",
          from_name: "label",
        },
      ],
      fixed_annotation_history_result: [
        {
          id: "XsW_x1hflv",
          type: "labels",
          value: {
            end: 838,
            text:
              "Media, a Happy and Healthy New Year. 2018 will be a great year for America!  Donald J. Trump (@realDonaldTrump) December 31, 2017Trump s tweet went down about as we",
            start: 674,
            labels: ["LOC"],
          },
          to_name: "text",
          from_name: "label",
        },
        {
          id: "FCuvjfSXNs",
          type: "labels",
          value: {
            end: 1662,
            text:
              " Sandoval (@AlanSandoval13) December 31, 2017Who uses the word Haters in a New Years wish??  Marlene (@marlene399) December 31, 2017You can t just say happy ",
            start: 1505,
            labels: ["MISC"],
          },
          to_name: "text",
          from_name: "label",
        },
        {
          id: "36kM4Zy2Y5",
          type: "labels",
          value: { end: 256, text: "o do and he couldn t do", start: 233, labels: ["PER"] },
          to_name: "text",
          from_name: "label",
        },
      ],
    },
    {
      id: 18,
      created_by: 1,
      created_at: "2021-05-26T13:03:49.330745Z",
      accepted: true,
      result: null,
      annotation: 24,
      fixed_annotation_history: 35,
      previous_annotation_history: 34,
      previous_annotation_history_result: [
        {
          id: "XsW_x1hflv",
          type: "labels",
          value: {
            end: 838,
            text:
              "Media, a Happy and Healthy New Year. 2018 will be a great year for America!  Donald J. Trump (@realDonaldTrump) December 31, 2017Trump s tweet went down about as we",
            start: 674,
            labels: ["LOC"],
          },
          to_name: "text",
          from_name: "label",
        },
        {
          id: "FCuvjfSXNs",
          type: "labels",
          value: {
            end: 1662,
            text:
              " Sandoval (@AlanSandoval13) December 31, 2017Who uses the word Haters in a New Years wish??  Marlene (@marlene399) December 31, 2017You can t just say happy ",
            start: 1505,
            labels: ["MISC"],
          },
          to_name: "text",
          from_name: "label",
        },
        {
          id: "36kM4Zy2Y5",
          type: "labels",
          value: { end: 256, text: "o do and he couldn t do", start: 233, labels: ["PER"] },
          to_name: "text",
          from_name: "label",
        },
      ],
      fixed_annotation_history_result: [
        {
          id: "XsW_x1hflv",
          type: "labels",
          value: {
            end: 838,
            text:
              "Media, a Happy and Healthy New Year. 2018 will be a great year for America!  Donald J. Trump (@realDonaldTrump) December 31, 2017Trump s tweet went down about as we",
            start: 674,
            labels: ["LOC"],
          },
          to_name: "text",
          from_name: "label",
        },
        {
          id: "FCuvjfSXNs",
          type: "labels",
          value: {
            end: 1662,
            text:
              " Sandoval (@AlanSandoval13) December 31, 2017Who uses the word Haters in a New Years wish??  Marlene (@marlene399) December 31, 2017You can t just say happy ",
            start: 1505,
            labels: ["MISC"],
          },
          to_name: "text",
          from_name: "label",
        },
        {
          id: "36kM4Zy2Y5",
          type: "labels",
          value: { end: 256, text: "o do and he couldn t do", start: 233, labels: ["PER"] },
          to_name: "text",
          from_name: "label",
        },
        {
          id: "ALbgPwBdmj",
          type: "labels",
          value: { end: 2215, text: "ale8) December 31, 2017Tr", start: 2190, labels: ["MISC"] },
          to_name: "text",
          from_name: "label",
        },
      ],
    },
  ],
});
