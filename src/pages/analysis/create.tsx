import { Spin } from "antd";
import { Field } from "formik";
import { Fields, Button } from "components";
import { Container } from "modules";
import { useHooks } from "hooks";

const Category = ({
  showCreateModal,
  setSuccess,
}: any): JSX.Element => {
  const { t } = useHooks();
  return (
    <div>
      <Container.Form
        url="/categories"
        method="post"
        name="categories"
        configs={{
          headers: { "Content-Type": "multipart/form-data" },
        }}
        fields={[
          {
            name: "categoryNameUz",
            type: "string",
            required: true,
          },
          {
            name: "categoryNameRu",
            type: "string",
            required: true,
          },
          {
            name: "categoryNameEn",
            type: "string",
            required: true,
          },
          {
            name: "categoryNameKr",
            type: "string",
            required: true,
          },
          {
            name: "images",
            required: true,
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["categories"] });
          setSuccess((prev: any) => !prev);
          resetForm();
          showCreateModal(false);
        }}
        onError={(error) => {
          console.log("Error", error);
        }}
      >
        {({ isSubmitting, setFieldValue }) => {
          return (
            <Spin spinning={isSubmitting} tip="Verifying">
              <Field
                rootClassName="mb-[30px] w-full"
                component={Fields.Input}
                name="categoryNameUz"
                type="text"
                placeholder={t("Categoyira nomi o'zbekcha")}
                size="large"
              />
              <Field
                rootClassName="mb-[30px] w-full"
                component={Fields.Input}
                name="categoryNameRu"
                type="text"
                placeholder={t("Categoyira nomi ruscha")}
                size="large"
              />
              <Field
                rootClassName="mb-[30px] w-full"
                component={Fields.Input}
                name="categoryNameEn"
                type="text"
                placeholder={t("Categoyira nomi inglizcha")}
                size="large"
              />
              <Field
                rootClassName="mb-[30px] w-full"
                component={Fields.Input}
                name="categoryNameKr"
                type="text"
                placeholder={t("Categoyira nomi xitoycha")}
                size="large"
              />
              <Field
                component={Fields.FileUpload}
                setFieldValue={setFieldValue}
                rootClassName="mb-[30px]"
                name="images"
                accept="image/png, image/jpeg, image/jpg"
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

export default Category;
