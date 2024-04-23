import { Fields } from "components";
import { Field } from "formik";
import { Container } from "modules";
import { Button, Spin } from "antd";
import { useHooks } from "hooks";

const User = ({ showEditModal, selectedCard }: any): JSX.Element => {
  const { get, t } = useHooks();
  return (
    <div>
      <Container.Form
        url={`/users/${get(selectedCard, "_id")}`}
        method="put"
        name="users"
        fields={[
          {
            name: "login",
            type: "string",
            value: get(selectedCard, "login"),
            required: true,
          },
          {
            name: "password",
            type: "string",
            value: get(selectedCard, "password"),
            required: true,
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["users"] });
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
                rootClassName="mb-[40px] w-[300px]"
                component={Fields.Input}
                name="login"
                type="text"
                placeholder={t("login")}
                label={t("login")}
                size="large"
              />
              <Field
                rootClassName="mb-[40px] w-[300px]"
                component={Fields.Input}
                name="password"
                type="text"
                placeholder={t("password")}
                label={t("password")}
                size="large"
              />
              <Button
                className="w-full h-auto py-[10px] px-4 bg-[#2196F3] text-white font-bold hover:!text-white"
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

export default User;