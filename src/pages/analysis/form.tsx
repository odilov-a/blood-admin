import { Field, FieldArray } from "formik";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Fields, Button } from "components";
import { useHooks } from "hooks";
import { gen4 } from "services/helpers";

const Form = ({ setFieldValue, values }: { setFieldValue: Function, values: any }) => {
  const { t } = useHooks();

  const removeMultiBox = (uid: string) => {
    const newArray = values.file.filter((f: { uid: string }) => f.uid !== uid);
    setFieldValue("file", newArray);
  };

  const addMultiBox = () => {
    setFieldValue("file", [...values.file, { analys_id: null, uid: gen4() }]);
  };

  return (
    <div className="w-full mt-[30px]">
      <div>
        <Field
          component={Fields.Input}
          name="name"
          size="large"
          type="string"
          placeholder={t("name")}
          rootClassName="mb-[20px]"
        />
        <Field
          component={Fields.Input}
          name="number"
          type="number"
          placeholder={t("number")}
          size="large"
          rootClassName="mb-[20px]"
        />
        <div className="mb-[24px]">
          <FieldArray name="file">
            {(arrayHelpers: any) => (
              <>
                {values.file.map((item: any, index: number) => (
                  <div key={item.uid} className="flex justify-between">
                    <div className="flex items-center">
                      <Field
                        component={Fields.AntAsyncSelect}
                        url="categories"
                        name={`file[${index}].analys_id`}
                        placeholder={t("Analiz turini tanlang")}
                        isClearable
                        className="mb-[10px] w-[250px] mr-[20px]"
                        optionLabel="name"
                        optionValue="_id"
                        isSearchable
                        loadOptionsParams={(search: any) => ({
                          extra: { name: search },
                        })}
                      />
                      <Field
                        component={Fields.FileUpload}
                        setFieldValue={setFieldValue}
                        name={`file[${index}].file`}
                        className="w-[100px]"
                      />
                    </div>
                    <div className="flex items-center">
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeMultiBox(item.uid)}
                          className="w-[30px] h-[30px] text-red-500"
                        >
                          <MinusCircleOutlined />
                        </button>
                      )}
                      {index === values.file.length - 1 && (
                        <button
                          type="button"
                          onClick={addMultiBox}
                          className="w-[30px] h-[30px] text-blue-500"
                        >
                          <PlusCircleOutlined />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </FieldArray>
        </div>
        <div className="flex justify-end mt-[20px]">
          <Button
            title={t("Save")}
            size="large"
            htmlType="submit"
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
