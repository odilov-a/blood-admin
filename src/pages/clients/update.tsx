import { Fields } from "components";
import { Field } from "formik";
import { Container } from "modules";
import { Button, Spin } from "antd";
import { useHooks } from "hooks";

const Client = ({ showEditModal, selectedCard }: any): JSX.Element => {
  const { get, t } = useHooks();
  return (
    <div className="">
      <Container.Form
        className="w-[100%]"
        url={`/clients/${get(selectedCard, "_id")}`}
        name="clients"
        method="put"
        fields={[
          {
            name: "fullName",
            type: "string",
            value: get(selectedCard, "fullName"),
            required: true,
          },
          {
            name: "phoneNumber",
            type: "string",
            value: get(selectedCard, "phoneNumber"),
            required: true,
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["clients"] });
          showEditModal(false)
        }}
        onError={(error) => {
          console.log("Error", error);
        }}
      >
        {({ isSubmitting, setFieldValue }) => {
          return (
            <Spin spinning={isSubmitting} tip="Verifying">
              <Field
                component={Fields.Input}
                className="mb-5 w-[100%]"
                name="fullName"
                type="text"
                placeholder={t("fullName")}
                size="large"
              />
              <Field
                className="mb-5 w-[100%]"
                component={Fields.Input}
                name="phoneNumber"
                type="text"
                placeholder={t("phoneNumber")}
                size="large"
              />
              <Button
                className="w-full border-0 h-auto py-[10px] px-4 bg-[#2196F3] text-white font-bold hover:!text-white"
                htmlType="submit"
              >
                {t("Saqlash")}
              </Button>
            </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Client;