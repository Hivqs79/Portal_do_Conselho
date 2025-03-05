import Rank from "@/components/rank/Rank";
// import Table from "@/components/table/Table";

export default function TestingComponents() {
  return (
    <>
      {/* <Table /> */}
      {/* <Rank type="otimo" outline={true} popover={false} /> */}
      {/* <Rank type="bom" outline={true} popover={false} /> */}
      {/* <Rank type="mediano" outline={true} popover={false} /> */}
      {/* <Rank type="critico" outline={true} popover={false} /> */}
      {/*  */}
      {/* <Rank type="otimo" outline={false} popover={false} /> */}
      {/* <Rank type="bom" outline={false} popover={false} /> */}
      {/* <Rank type="mediano" outline={false} popover={false} /> */}
      {/* <Rank type="critico" outline={false} popover={false} /> */}

      <Rank type="otimo" outline={true} popover={true} />
    </>
  );
}
