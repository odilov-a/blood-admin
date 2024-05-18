import { Spin, notification } from "antd";
import { Field } from "formik";
import { Fields, Button } from "components";
import { Container } from "modules";
import { useHooks } from "hooks";

const Blog = ({ showCreateModal, setSuccess, successed }: any): JSX.Element => {
  const { t } = useHooks();
  return (
    <div>
      <Container.Form
        url="/blogs"
        method="post"
        name="blogs"
        configs={{
          headers: { "Content-Type": "multipart/form-data" },
        }}
        fields={[
          {
            name: "title",
            type: "string",
            required: true,
          },
          {
            name: "description",
            type: "string",
            required: true,
          },
          {
            name: "image",
            required: true,
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          notification["success"]({
            message: t("Успешно!"),
            duration: 2,
          });
          query.invalidateQueries({ queryKey: ["blogs"] });
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
                name="title"
                type="text"
                placeholder={t("Blog nomi")}
                size="large"
              />
              <Field
                rootClassName="mb-[20px] w-[450px]"
                component={Fields.Input}
                name="description"
                type="text"
                placeholder={t("To'liq blog")}
                size="large"
              />
              <Field
                component={Fields.FileUpload}
                setFieldValue={setFieldValue}
                rootClassName="mb-[40px]"
                name="image"
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

export default Blog;