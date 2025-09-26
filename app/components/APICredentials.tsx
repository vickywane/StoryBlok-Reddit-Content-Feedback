"use client";
import { useForm, Controller } from "react-hook-form";
import TextInput from "../components/TextInput";
import { useConfigStore } from "../store/configStore";

interface ApiConfigForm {
  storyblokKey: string;
  openaiKey: string;
  spaceId: string;
}

export default function APICredentials() {
  const { saveCredentialsConfig, setCurrentStep } = useConfigStore();

  const apiForm = useForm<ApiConfigForm>({
    defaultValues: {
      storyblokKey: "",
      openaiKey: "",
      spaceId: "",
    },
  });

  const onSaveApiConfig = (data: ApiConfigForm) => {
    saveCredentialsConfig({
      storyBlokToken: data.storyblokKey,
      openaiApiKey: data.openaiKey,
      storyBlokSpaceId: data.spaceId,
    });

    setCurrentStep(2);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        API Configuration
      </h2>
      <p className="text-gray-600 mb-6">
        Configure your API keys to enable data analysis and content management.
      </p>

      <form
        onSubmit={apiForm.handleSubmit(onSaveApiConfig)}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Controller
            name="storyblokKey"
            control={apiForm.control}
            rules={{ required: "StoryBlok key is required" }}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                label="StoryBlok Management Key"
                id="storyblok-key"
                type="password"
                placeholder="Enter your StoryBlok management key"
                required
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="openaiKey"
            control={apiForm.control}
            rules={{ required: "OpenAI key is required" }}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                label="OpenAI API Key"
                id="openai-key"
                type="password"
                placeholder="Enter your OpenAI API key"
                required
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="spaceId"
            control={apiForm.control}
            rules={{ required: "Space ID is required" }}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                label="Space ID"
                id="space-id"
                placeholder="Enter your StoryBlok Space ID"
                required
                error={fieldState.error?.message}
              />
            )}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition-colors"
        >
          Save API Credentials
        </button>
      </form>
    </div>
  );
}
