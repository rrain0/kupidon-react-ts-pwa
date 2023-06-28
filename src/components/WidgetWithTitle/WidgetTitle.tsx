import styled from "styled-components";
import {ReactUtils} from "src/utils/ReactUtils";
import ReactMemoTyped = ReactUtils.ReactMemoTyped;


const WidgetTitle = styled.span`
  display: inline-flex;
  flex-flow: row wrap;
  align-items: start;
  font: 500 18px/150% 'Futura PT';
  letter-spacing: 0.05em;
  color: #424041;
  white-space: pre-wrap;
  
  em { // для звёздочки *
    font: 500 24px 'Futura PT';
    margin-bottom: -6px;
    letter-spacing: 0.05em;
    color: #8B8B8B;
  }
`
export default ReactMemoTyped(WidgetTitle)