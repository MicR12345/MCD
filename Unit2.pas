unit Unit2;

interface

uses
  System.SysUtils, System.Types, System.UITypes, System.Classes, System.Variants,
  FMX.Types, FMX.Controls, FMX.Forms, FMX.Graphics, FMX.Dialogs, FMX.StdCtrls,
  FMX.Controls.Presentation, FMX.Objects;

type
  TForm2 = class(TForm)
    Label1: TLabel;
    Label2: TLabel;
    tb1: TTrackBar;
    Image1: TImage;
    Image2: TImage;
    Label3: TLabel;
    CornerButton1: TCornerButton;
    CornerButton2: TCornerButton;
    StyleBook1: TStyleBook;
    procedure Image2Click(Sender: TObject);
    procedure Image1Click(Sender: TObject);
    procedure tb1Change(Sender: TObject);
    procedure CornerButton2Click(Sender: TObject);
    procedure CornerButton1Click(Sender: TObject);
    procedure FormCreate(Sender: TObject);

  private
    { Private declarations }
  public
    sw:boolean;
  end;

var
  Form2: TForm2;
  m: Double;
  v:Integer;

implementation

{$R *.fmx}

uses Unit6, Unit4, Unit9;





procedure TForm2.CornerButton1Click(Sender: TObject);
begin
  ModalResult:=mrok;
end;

procedure TForm2.CornerButton2Click(Sender: TObject);
var
row:Integer;
begin
  ShowMessage(Form9.qryREALIZACJA.AsString);
  ModalResult:=mrYes;
end;



procedure TForm2.FormCreate(Sender: TObject);
begin
  Label1.Text:=Form9.qryARTYKUL_KOD.AsString +' - '+ Form9.qryARTYKUL_OPIS.asString;
  Label2.Text:=Form9.qryREALIZACJA.AsString;

  m:=Form9.qryILOSC_MAX.AsFloat;
  tb1.Max:=m;
  Label3.Text:= 'Iloœæ: ' + tb1.Value.ToString + '/' + m.ToString;
end;

procedure TForm2.Image1Click(Sender: TObject);
begin
  if tb1.value<>m then
  begin
    tb1.value:=tb1.value+1;
    v:=tb1.Value.ToString.ToInteger;
    Label3.Text:= 'Iloœæ: ' + tb1.Value.ToString + '/' + m.ToString;
  end;

end;

procedure TForm2.Image2Click(Sender: TObject);
begin
  if tb1.value<>0 then
  begin
    tb1.value:=tb1.value-1;
    v:=tb1.Value.ToString.ToInteger;
    Label3.Text:= 'Iloœæ: ' + tb1.Value.ToString + '/' + m.ToString;
  end;
end;

procedure TForm2.tb1Change(Sender: TObject);
begin
  Label3.Text:= 'Iloœæ: ' + tb1.Value.ToString + '/' + m.ToString;
  v:=tb1.Value.ToString.ToInteger;
end;

end.
