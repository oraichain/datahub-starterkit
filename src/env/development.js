/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Radio } from "antd";
import { render } from "react-dom";
import External from "../core/External";
import Messages from "../utils/messages";

const dataList = {
  dialogue_analysis: import("../examples/dialogue_analysis").then(item => item.DialogueAnalysis),
  named_entity: import("../examples/named_entity").then(item => item.NamedEntity),
  references: import("../examples/references").then(item => item.References),
  required: import("../examples/required").then(item => item.Required),
  sentiment_analysis: import("../examples/sentiment_analysis").then(item => item.Sentiment),
  nested_choices: import("../examples/nested_choices").then(item => item.Nested),
  nested_choices_complicated: import("../examples/nested_choices/complicated").then(item => item.Nested),
  phrases: import("../examples/phrases").then(item => item.Dialogue),
  audio_classification: import("../examples/audio_classification").then(item => item.AudioClassification),
  audio_regions: import("../examples/audio_regions").then(item => item.AudioRegions),
  transcribe_audio: import("../examples/transcribe_audio").then(item => item.TranscribeAudio),
  video: import("../examples/video").then(item => item.VideoRegions),
  image_bbox: import("../examples/image_bbox").then(item => item.ImageBbox),
  image_bbox_large: import("../examples/image_bbox_large").then(item => item.ImageBboxLarge),
  image_keypoints: import("../examples/image_keypoints").then(item => item.ImageKeyPoint),
  image_multilabel: import("../examples/image_multilabel").then(item => item.ImageMultilabel),
  image_ellipses: import("../examples/image_ellipses").then(item => item.ImageEllipselabels),
  image_polygons: import("../examples/image_polygons").then(item => item.ImagePolygons),
  image_segmentation: import("../examples/image_segmentation").then(item => item.ImageSegmentation),
  image_tools: import("../examples/image_tools").then(item => item.ImageTools),
  html_document: import("../examples/html_document").then(item => item.HTMLDocument),
  taxonomy: import("../examples/taxonomy").then(item => item.Taxonomy),
  rich_text_html: import("../examples/rich_text_html").then(item => item.RichTextHtml),
  rich_text_plain: import("../examples/rich_text_plain").then(item => item.RichTextPlain),
  rich_text_plain_remote: import("../examples/rich_text_plain_remote").then(item => item.RichTextPlainRemote),
  pairwise: import("../examples/pairwise").then(item => item.Pairwise),
  repeater: import("../examples/repeater").then(item => item.Repeater),
  timeseries: import("../examples/timeseries").then(item => item.TimeSeries),
  timeseries_single: import("../examples/timeseries_single").then(item => item.TimeSeries),
};

const currentExample = window.localStorage.getItem("example") || "nested_choices_complicated";

const Example = () => {
  const setExample = e => {
    window.localStorage.setItem("example", e.target.value);
    window.location.reload();
  };

  return (
    <Radio.Group value={currentExample} onChange={setExample}>
      {Object.keys(dataList).map(k => (
        <Radio.Button key={k} value={k}>
          {k.replace(/[_/]+/g, " ").replace(/(?<=^| )./g, m => m.toUpperCase())}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};

render(<Example />, document.getElementById("examples"));

function getData(task) {
  if (task && task.data) {
    return {
      ...task,
      data: JSON.stringify(task.data),
    };
  }

  return task;
}

/**
 * Get current config
 * @param {string} pathToConfig
 */
async function getConfig(pathToConfig) {
  const response = await fetch(pathToConfig);
  const config = await response.text();

  return config;
}

/**
 * Get custom config
 */
async function getExample() {
  const datatype = await dataList[currentExample];

  let config = await getConfig(datatype.config);
  let annotations = datatype.annotation.annotations;
  let predictions = datatype.tasks[0].predictions;

  let task = {
    annotations,
    predictions,
    data: JSON.stringify(datatype.tasks[0].data),
  };

  return { config, task, annotations, predictions };
}

/**
 * Function to return App element
 */
function rootElement(element) {
  let root;

  if (typeof element === "string") {
    root = document.getElementById(element);
  } else {
    root = element;
  }

  root.innerHTML = "";

  root.style.width = "auto";

  return root;
}

/**
 * Function to configure application with callbacks
 * @param {object} params
 */
function configureApplication(params) {
  const options = {
    alert: m => console.log(m), // Noop for demo: window.alert(m)
    messages: { ...Messages, ...params.messages },
    onSubmitAnnotation: params.onSubmitAnnotation ? params.onSubmitAnnotation : External.onSubmitAnnotation,
    onUpdateAnnotation: params.onUpdateAnnotation ? params.onUpdateAnnotation : External.onUpdateAnnotation,
    onDeleteAnnotation: params.onDeleteAnnotation ? params.onDeleteAnnotation : External.onDeleteAnnotation,
    onSkipTask: params.onSkipTask ? params.onSkipTask : External.onSkipTask,
    onSubmitDraft: params.onSubmitDraft,
    onTaskLoad: params.onTaskLoad ? params.onTaskLoad : External.onTaskLoad,
    onLabelStudioLoad: params.onLabelStudioLoad ? params.onLabelStudioLoad : External.onLabelStudioLoad,
    onEntityCreate: params.onEntityCreate || External.onEntityCreate,
    onEntityDelete: params.onEntityDelete || External.onEntityDelete,
    onGroundTruth: params.onGroundTruth || External.onGroundTruth,
    onSelectAnnotation: params.onSelectAnnotation || External.onSelectAnnotation,
    onAcceptAnnotation: params.onAcceptAnnotation || External.onAcceptAnnotation,
    onRejectAnnotation: params.onRejectAnnotation || External.onRejectAnnotation,
    onStorageInitialized: params.onStorageInitialized || External.onStorageInitialized,
  };

  return options;
}

export default { rootElement, getExample, getData, configureApplication };
