
import { useHooks } from "hooks";
import Container from "modules/container";
import Form from "./form";

const Analysis = ({ showCreateModal, createModal }: any): JSX.Element => {
  const { get } = useHooks();
  let data = createModal.data && createModal?.data
  function gen4() {
    return Math.random()
      .toString(16)
      .slice(-4);
  }

  return (
    <div>
      <Container.Form
        url={get(data, "_id") ? `analysis/${get(data, "_id")}` : "analysis"}
        method={get(data, "_id") ? "put" : "post"}
        name="analysis"
        configs={{
          headers: { "Content-Type": "multipart/form-data" },
        }}
        fields={[
          {
            name: "name",
            type: "string",
            required: true,
            value: get(data, "name")
          },
          {
            name: "number",
            type: "number",
            required: true,
            value: get(data, "number")
          },
          {
            name: "file",
            type: "array",
            value: !get(data, "_id") ? [{
              analys_id: null,
              uid: gen4(),
              file: null
            }] : get(data, "analysis").map((item: any, idx: any) => ({
              analys_id: item.analys_id,
              file: item.file
            })),
            onSubmitValue: (value, values) => (
              value.map((item: any, idx: any) => ({
                analys_id: item.analys_id,
                file: item.file
              }))
            )
          }
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["analysis"] });
          resetForm();
          showCreateModal(false);
        }}
        onError={(error) => {
          console.log("Error", error);
        }}
      >
        {({ isSubmitting, setFieldValue, errors, values }) => {
          return (
            <Form {...{ setFieldValue, values }} />
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Analysis;