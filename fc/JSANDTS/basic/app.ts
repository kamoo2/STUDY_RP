type DayOfWeek = "월" | "화" | "수" | "목" | "금" | "토" | "일";

const monday: DayOfWeek = "월";

type TGetApi = {
  (url: string, search?: string): Promise<string>;
};

type ArrowTGetApi = (url: string, search?: string) => Promise<string>;

const getApi: ArrowTGetApi = (url, search = "") => {
  return new Promise((resolve) => resolve("OK"));
};

const getApii: TGetApi = function (url, search = "") {
  return new Promise((resolve) => resolve("OK"));
};

interface TRect {
  id: number;
  x: number;
  y: number;
}

class Rect implements TRect {
  id: number;
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.id = Math.random() * 100000;
    this.x = x;
    this.y = y;
  }
}
