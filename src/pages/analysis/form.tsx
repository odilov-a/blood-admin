import { Field } from "formik";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Fields, Button } from "components";
import { useHooks } from "hooks";
import { gen4 } from "services/helpers";

const Form = ({ setFieldValue, values }: any) => {
  const { t, get } = useHooks();

  const removeMultiBox = (uid: any) => {
    const newArray = values.analysis.filter((f: any) => f.uid !== uid);
    setFieldValue("analysis", newArray)
  }

  const addMultiBox = () => {
    setFieldValue("analysis", [...values.analysis, {
      analys_id: null,
      uid: gen4()
    }]);
  }

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
          {get(values, "analysis", []).map((item: any, index: number) => {
            return (
              <div className="flex justify-between">
                <div className="flex">
                  <Field
                    component={Fields.AntAsyncSelect}
                    url="categories"
                    name={`analysis[${index}].analys_id`}
                    placeholder={t("Analiz turini tanlang")}
                    isClearable
                    className="mb-[20px] w-[250px] mr-[20px]"
                    optionLabel="name"
                    optionValue="_id"
                    isSearchable
                    loadOptionsParams={(search: any) => {
                      return {
                        extra: { name: search },
                      }
                    }}
                  />
                  <Field
                    component={Fields.FileUpload}
                    setFieldValue={setFieldValue}
                    name={`analysis[${index}].file`}
                    className="w-[100px]"
                  />
                </div>
                <div className="flex">
                  {get(values, "analysis", []).length > 1 && (
                    <button
                      type="button"
                      className="w-[30px] h-[40px]"
                      onClick={() => removeMultiBox(item.uid)}
                    >
                      <MinusCircleOutlined style={{ color: "red" }} />
                    </button>
                  )}
                  {(get(values, "analysis", []).length - 1) === index && (
                    <button
                      type="button"
                      className="w-[30px] h-[40px]"
                      onClick={() => addMultiBox()}
                    >
                      <PlusCircleOutlined style={{ color: "#40a9ff" }} />
                    </button>
                  )}
                </div>
              </div>
            )
          })}
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
  )
}

export default Form