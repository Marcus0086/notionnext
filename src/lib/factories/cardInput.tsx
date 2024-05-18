import React from "react";

import {
  NameInput,
  UrlInput,
  FontInput,
  MediaInput,
  VisibilityInput,
  DeleteInput,
  OpenTextInput,
  InputAdd,
  TextAreaInput,
  NavTypeInput,
  FooterTypeInput,
  FooterNoteInput,
  FooterTitleInput,
  SocialLinksAddInput,
} from "@/components/shared/inputs";

import { CardInputFactory, CardInputs, CardInputComponent } from "@/types";

class DefaultCardInputFactory implements CardInputFactory {
  private static readonly inputFactory: {
    [key in CardInputs]: React.ComponentType<CardInputComponent>;
  } = {
    text: NameInput,
    url: UrlInput,
    font: FontInput,
    media: MediaInput,
    visibility: VisibilityInput,
    delete: DeleteInput,
    opentext: OpenTextInput,
    textarea: TextAreaInput,
    listadd: InputAdd,
    navtype: NavTypeInput,
    footertype: FooterTypeInput,
    footernote: FooterNoteInput,
    footertitle: FooterTitleInput,
    linksadd: SocialLinksAddInput,
  };
  getInput(type: CardInputs, value?: string | any | null): JSX.Element {
    const InputComponent = DefaultCardInputFactory.inputFactory[type];
    return <InputComponent value={value !== null ? value : undefined} />;
  }
}

const CardsInputFactory = new DefaultCardInputFactory();

export { CardsInputFactory };
