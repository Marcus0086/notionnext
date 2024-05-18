import {
  ThemeToggle,
  SearchToggle,
  AiToggle,
  TwitterToggle,
  IncludeNotionIdInUrlsToggle,
  TopLoaderToggle,
  SiteMapToggle,
  PreviewToggle,
  IndexingToggle,
  FooterDividerToggle,
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
    preview: PreviewToggle,
    twitter: TwitterToggle,
    toploader: TopLoaderToggle,
    prettyurls: IncludeNotionIdInUrlsToggle,
    sitemap: SiteMapToggle,
    indexing: IndexingToggle,
    footerdivider: FooterDividerToggle,
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
