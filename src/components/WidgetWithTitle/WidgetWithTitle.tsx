import styled from "styled-components";
import {ReactUtils} from "src/utils/ReactUtils";
import ReactMemoTyped = ReactUtils.ReactMemoTyped;
import {StyledCommon} from "src/styles/StyledCommon";
import col = StyledCommon.col;


const WidgetWithTitle = styled.label`
  width: 100%; height: fit-content;
  ${col};
  gap: 8px;
  align-items: start;
`
export default ReactMemoTyped(WidgetWithTitle)