
import { useHooks } from "hooks";
import Container from "modules/container";
import Form from "./form";

const Analysis = ({ showCreateModal, createModal }: any): JSX.Element => {
  const { t, get } = useHooks();
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
            name: "analysis", type: "array", value: [{
              analys_id: null,
              uid: gen4(),
              file: null
            }],
            onSubmitValue: (value, values) => (
              value.map((item: any, idx: any) => ({
                analys_id: item.analys_id,
                file: item.file
              }))
            )
          }
        ]}
        // onSubmitValue: (value, values) => (
        //   value.reduce((prev: any, curr: any) => {
        //     console.log({analys_id: get(curr, '[0].analys_id')},{prev}, {curr});

        //     prev.push({
        //       analys_id: get(curr, 'analys_id'),
        //       file: get(curr, 'file')
        //     })
        //     return prev
        //   }, [])
        // )

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