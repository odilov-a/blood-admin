import { Spin, notification } from "antd";
import { Field } from "formik";
import { Fields, Button } from "components";
import { Container } from "modules";
import { useHooks } from "hooks";

const Filial = ({ showCreateModal, setSuccess, successed }: any): JSX.Element => {
  const { t } = useHooks();
  return (
    <div>
      <Container.Form
        url="/filials"
        method="post"
        name="filials"
        fields={[
          {
            name: "location",
            type: "string",
            required: true,
          },
          {
            name: "filialName",
            type: "string",
            required: true,
          },
          {
            name: "phoneNumber",
            type: "string",
            required: true,
          },
          {
            name: "workingTime",
            type: "string",
            required: true,
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          notification["success"]({
            message: t("Успешно!"),
            duration: 2,
          });
          query.invalidateQueries({ queryKey: ["filials"] });
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
                name="location"
                type="text"
                placeholder={t("location")}
                size="large"
              />
              <Field
                rootClassName="mb-[20px] w-[450px]"
                component={Fields.Input}
                name="filialName"
                type="text"
                placeholder={t("filialName")}
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
              <Field
                rootClassName="mb-[20px] w-[450px]"
                component={Fields.Input}
                name="workingTime"
                type="text"
                placeholder={t("workingTime")}
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

export default Filial;