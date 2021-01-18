import styled from "styled-components"
import { lighten } from "polished"

export const Appeals = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 24px 0;
`

export const AppealWrapper = styled.div`
  background: ${(props) => props.theme.sidebar.background};
  cursor: pointer;

  .preview {
    padding: 24px; 10px;
    display: flex;
    flex-direction: column;

    p {
      padding: 0;
      margin: 0;
    }

    .row {
      display: flex;
      justify-content: space-between;
    }
  }

  .preview:hover p {
    color: ${(props) => props.theme.main.link};
  }

  .expand {
    padding: 10px 32px;
    background: ${(props) => lighten(0.02, props.theme.sidebar.background)};
  }

  .pill:not(.processing) {
    padding: 2px 8px;
    line-height: 1.25rem;
    border-radius: 12px;
  }

   .in_questioning {
      background: #D17805BF;
   }
   .questioning_rejoined{
      background: #D17805BF;
   }
   .accepted{
      background: #02F52866;
   }
   .rejected{
      background: #EE0E0E60;
   }
`
