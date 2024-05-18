import { Fields } from "components";
import { Field } from "formik";
import { Container } from "modules";
import { Button, Spin } from "antd";
import { useHooks } from "hooks";

const Filial = ({ showEditModal, selectedCard }: any): JSX.Element => {
  const { get, t } = useHooks();
  return (
    <div className="">
      <Container.Form
        className="w-[100%]"
        url={`/filials/${get(selectedCard, "_id")}`}
        name="filials"
        method="put"
        fields={[
          {
            name: "location",
            type: "string",
            value: get(selectedCard, "location"),
            required: true,
          },
          {
            name: "filialName",
            type: "string",
            value: get(selectedCard, "filialName"),
            required: true,
          },
          {
            name: "phoneNumber",
            type: "string",
            value: get(selectedCard, "phoneNumber"),
            required: true,
          },
          {
            name: "workingTime",
            type: "string",
            value: get(selectedCard, "workingTime"),
            required: true,
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["filials"] });
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
                name="location"
                type="text"
                placeholder={t("location")}
                size="large"
              />
              <Field
                className="mb-5 w-[100%]"
                component={Fields.Input}
                name="filialName"
                type="text"
                placeholder={t("filialName")}
                size="large"
              />
              <Field
                component={Fields.Input}
                className="mb-5 w-[100%]"
                name="phoneNumber"
                type="text"
                placeholder={t("phoneNumber")}
                size="large"
              />
              <Field
                className="mb-5 w-[100%]"
                component={Fields.Input}
                name="workingTime"
                type="text"
                placeholder={t("workingTime")}
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

export default Filial;