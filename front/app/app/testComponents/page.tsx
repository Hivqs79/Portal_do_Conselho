import Rank from "@/components/rank/Rank";
import Table from "@/components/table/Table";

export default function TestingComponents() {
  return (
    <>
      <Table />
      <Rank type="otimo" outline={true} />
      <Rank type="bom" outline={true} />
      <Rank type="mediano" outline={true} />
      <Rank type="critico" outline={true} />

      <Rank type="otimo" outline={false} />
      <Rank type="bom" outline={false} />
      <Rank type="mediano" outline={false} />
      <Rank type="critico" outline={false} />
    </>
  );
}
