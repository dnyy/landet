import dayjs from "dayjs";
import "dayjs/locale/sv";
import * as localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

export const formatDate = (date, locale = "sv", dateFormat = "LL") =>
  date && dayjs(date).locale(locale).format(dateFormat);
