import { Fields } from "components";
import { Field } from "formik";
import { Container } from "modules";
import { Button, Spin } from "antd";
import { useHooks } from "hooks";

const Category = ({ showEditModal, selectedCard }: any): JSX.Element => {
  const { get, t } = useHooks();
  return (
    <div>
      <Container.Form
        url={`/categories/${get(selectedCard, "_id")}`}
        method="put"
        name="categories"
        configs={{
          headers: { 'Content-Type': 'multipart/form-data' },
        }}
        fields={[
          {
            name: "categoryNameUz",
            type: "string",
            value: get(selectedCard, "categoryNameUz"),
            required: true,
          },
          {
            name: "categoryNameRu",
            type: "string",
            value: get(selectedCard, "categoryNameRu"),
            required: true,
          },
          {
            name: "categoryNameKr",
            type: "string",
            value: get(selectedCard, "categoryNameKr"),
            required: true,
          },
          {
            name: "categoryNameEn",
            type: "string",
            value: get(selectedCard, "categoryNameEn"),
            required: true,
          },
          {
            name: "images",
            required: true,
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["categories"] });
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
                rootClassName="mb-[30px] w-full"
                name="categoryNameUz"
                type="text"
                placeholder={t("categoryNameUz")}
                size="large"
              />
              <Field
                component={Fields.Input}
                rootClassName="mb-[30px] w-full"
                name="categoryNameRu"
                type="text"
                placeholder={t("categoryNameRu")}
                size="large"
              />
              <Field
                component={Fields.Input}
                rootClassName="mb-[30px] w-full"
                name="categoryNameEn"
                type="text"
                placeholder={t("categoryNameEn")}
                size="large"
              />
              <Field
                component={Fields.Input}
                rootClassName="mb-[30px] w-full"
                name="categoryNameKr"
                type="text"
                placeholder={t("categoryNameKr")}
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

export default Category;