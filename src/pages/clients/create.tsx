import { Spin, notification } from "antd";
import { Field } from "formik";
import { Fields, Button } from "components";
import { Container } from "modules";
import { useHooks } from "hooks";

const Client = ({ showCreateModal, setSuccess, successed }: any): JSX.Element => {
  const { t } = useHooks();
  return (
    <div>
      <Container.Form
        url="/clients"
        method="post"
        name="clients"
        fields={[
          {
            name: "fullName",
            type: "string",
            required: true,
          },
          {
            name: "phoneNumber",
            type: "string",
            required: true,
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          notification["success"]({
            message: t("Успешно!"),
            duration: 2,
          });
          query.invalidateQueries({ queryKey: ["clients"] });
          setSuccess((prev: any) => !prev);
          resetForm();
          showCreateModal(false);
        }}
        onError={(error) => {
          notification["error"]({
            message: error ? error : t("Произошло ошибка!"),
            duration: 2,
          });
          console.log("Error", error);
        }}
      >
        {({ isSubmitting, setFieldValue }) => {
          return (
            <Spin spinning={isSubmitting} tip="Verifying">
              <Field
                rootClassName="mb-[20px] w-[450px]"
                component={Fields.Input}
                name="fullName"
                type="text"
                placeholder={t("fullName")}
                size="large"
              />
              <Field
                rootClassName="mb-[20px] w-[450px]"
                component={Fields.Input}
                name="phoneNumber"
                type="text"
                placeholder={t("phoneNumber")}
                size="large"
              />
              <Button
                title={t("Saqlash")}
                className="w-full mt-[20px]"
                htmlType="submit"
                size="large"
              />
            </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Client;