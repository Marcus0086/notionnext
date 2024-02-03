import {
  ThemeToggle,
  SearchToggle,
  AiToggle,
  TwitterToggle,
  IncludeNotionIdInUrlsToggle,
  TopLoaderToggle,
} from "@/components/shared/toggleInputs";

import {
  ToggleInputComponent,
  ToggleInputFactory,
  ToggleInputs,
} from "@/types";

class DefaultToggleInputFactory implements ToggleInputFactory {
  private static readonly inputFactory: {
    [key in ToggleInputs]: React.ComponentType<ToggleInputComponent> | Error;
  } = {
    ai: AiToggle,
    search: SearchToggle,
    theme: ThemeToggle,
    preview: new Error("Preview is not implemented yet"),
    twitter: TwitterToggle,
    toploader: TopLoaderToggle,
    prettyurls: IncludeNotionIdInUrlsToggle,
  };

  getInput(type: ToggleInputs, siteId: string): JSX.Element {
    const InputComponent = DefaultToggleInputFactory.inputFactory[type];
    if (InputComponent instanceof Error) {
      throw InputComponent;
    }
    return <InputComponent siteId={siteId} />;
  }
}

const TogglesInputFactory = new DefaultToggleInputFactory();

export { TogglesInputFactory };
