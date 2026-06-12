export const MODULES = [
  { key: "crm", name: "CRM", description: "Клиенты, сделки, компании, задачи и воронки продаж.", href: "/crm" },
  { key: "leads", name: "Заявки", description: "Единый центр входящих заявок из сайтов, форм, мессенджеров и webhook.", href: "/leads" },
  { key: "finance", name: "Финансы", description: "Доходы, расходы, прибыль, план-факт и управленческие отчёты.", href: "/finance" },
  { key: "warehouse", name: "Склад", description: "Номенклатура, остатки, приход, списание и резервирование.", href: "/warehouse" },
  { key: "learning", name: "Обучение", description: "База знаний, уроки, регламенты, чек-листы и прогресс прохождения.", href: "/learning" },
  { key: "analytics", name: "Аналитика", description: "Дашборды, конверсии, источники, скорость реакции и эффективность команды.", href: "/analytics" },
  { key: "ai", name: "AI", description: "AI-ассистенты, генерация ответов, анализ сделок и рекомендации.", href: "/ai" },
  { key: "client_portal", name: "Личный кабинет клиента", description: "Внешний кабинет для клиентов: статусы, документы, сообщения и оплата.", href: "/client-portal" },
] as const;

export type ModuleKey = (typeof MODULES)[number]["key"];

export function getModuleByKey(key: string) {
  return MODULES.find((module) => module.key === key);
}
