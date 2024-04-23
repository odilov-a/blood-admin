import React from "react";
import { Layout, Select } from "antd";
import i18next from "i18next";
import { useHooks } from "hooks";
import useStore from "store";
import { privateRoutes } from "routes/data";
import config from "config";

const { Header } = Layout;

interface IProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderComponent = ({ collapsed, setCollapsed }: IProps) => {
  const { get, location } = useHooks();
  const { system } = useStore();
  const { Option } = Select;
  const menus = privateRoutes.find((m) => m.path === get(location, "pathname"));

  const changeLang = (langCode: string) => {
    i18next.changeLanguage(langCode);
    window.location.reload();
    // changeLang(langCode)
  };

  return (
    <Header className="flex justify-between items-center bg-[#fff] dark:bg-[#222638] p-0 pr-[20px]">
      <div>
        <span className="font-[500] text-[20px] dark:text-[#9EA3B5] text-black ml-[48px]">
          {menus?.title}
        </span>
      </div>
      <Select
        defaultValue={system?.lang}
        size={"large"}
        onChange={(value: any) => {
          changeLang(value);
        }}
      >
        {config.API_LANGUAGES.map((lang) => (
          <Option value={lang?.code}>{lang?.short}</Option>
        ))}
      </Select>
    </Header>
  );
};

export default HeaderComponent;
