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
  };
  getInput(type: CardInputs, value?: string | undefined): JSX.Element {
    const InputComponent = DefaultCardInputFactory.inputFactory[type];
    return <InputComponent value={value} />;
  }
}

const CardsInputFactory = new DefaultCardInputFactory();

export { CardsInputFactory };
